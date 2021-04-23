import{
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription
} from 'type-graphql';
import { v4 } from 'uuid';
import { getConnection } from "typeorm";
import { DirectMessage } from "../entities/DirectMessage";
import { User } from '../entities/User';
import { filterSubscription } from '../utils/filterSubscription';
import { 
    MyContext, 
    GraphQLUpload,
    Upload 
} from "../types";
import fs, { createWriteStream } from 'fs';
import path from 'path';


const NEW_DM_EVENT = 'NEW_DM_EVENT';
const NEW_TYPING_DM_EVENT = 'NEW_TYPING_DM_EVENT';
const IS_TYPING_DM_PREFIX = 'IS_TYPING_DM_PREFIX';

@Resolver(DirectMessage)
export class DirectMessageResolver {
    @FieldResolver(() => Boolean)
    isRead(
        @Root() { senderId, isRead } : DirectMessage,
        @Ctx() { req } : MyContext
    ) : boolean {
        const { uid } = req.session;
        const isSender = senderId === uid;

        return isRead || isSender;
    }

    @FieldResolver(() => User)
    async user(
        @Root() { senderId } : DirectMessage
    ) : Promise<User | undefined> {
        return User.findOne(senderId);
    }

    @FieldResolver()
    async pic(
        @Root() dm:  DirectMessage
    ) : Promise<string> {
        if(!dm.pic) {
            return '';
        }

        return `${process.env.SERVER_URL}/images/${dm.pic}`;
    }

    @Subscription(() => Boolean, {
        topics: NEW_TYPING_DM_EVENT,
        filter: filterSubscription 
    })
    newUserTypingDm() : boolean {
        return true;
    }

    @Subscription(() => Boolean, {
        topics: NEW_DM_EVENT,
        filter: filterSubscription
    })
    newDirectMessage(): boolean {
        return true;
    }

    @Mutation(() => Boolean)
    async readDms(
        @Arg('userId', () => Int) userId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        await getConnection().query(
            `
                update direct_message
                set "isRead" = true 
                where "receiverId" = $1
                and "senderId" = $2
            `, [req.session.uid, userId]
        );

        return true;
    }

    @Query(() => [User])
    async unreadChats(
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const result = [];

        const users = await getConnection().query(
            `
                select u.*, (

                    select max(d."createdAt") from direct_message as d
                    where (d."senderId" = u.id and d."receiverId" = $1) 
                    and d."isRead" = false
                    and u.id != $1

                ) as latest from "user" as u 
                order by latest DESC 
                limit 5
            `, 
            [req.session.uid]
        );

        for(let i=0;i<users.length;i++) {
            if(users[i].latest) {
                result.push(users[i]);
            }
        }

        return result;
    }

    @Query(() => User, { nullable: true })
    async userTypingDm(
        @Ctx() { req, redis } : MyContext
    ) : Promise<User | undefined> {
        const users = await getConnection().query(
            `
                select distinct(u.*) from "user" as u
                inner join direct_message as d on (d."receiverId" = u.id or d."senderId" = u.id)
                and (d."receiverId" = $1 or d."senderId" = $1) 
                and u.id != $1
            `, [req.session.uid]
        );

        for(let i=0;i<users.length;i++){
            const key = IS_TYPING_DM_PREFIX + users[i].id;
            const cachedId  = await redis.get(key);

            if(parseInt(cachedId!) === req.session.uid) {
                return users[i];
            }
        }

        return undefined;
    }

    @Mutation(() => Boolean)
    async stopTypingDm(
        @PubSub() pubsub: PubSubEngine,
        @Arg('receiverId', () => Int) receiverId: number,
        @Ctx() { req, redis } : MyContext
    ) : Promise<boolean> {
        const key = IS_TYPING_DM_PREFIX + req.session.uid;

        await redis.del(key);

        await pubsub.publish(NEW_TYPING_DM_EVENT, {
            senderId: req.session.uid,
            receiverId,
            isDm: true
        });

        return true;
    }

    @Mutation(() => Boolean)
    async startTypingDm(
        @PubSub() pubsub: PubSubEngine,
        @Arg('receiverId', () => Int) receiverId: number,
        @Ctx() { req, redis } : MyContext
    ) : Promise<boolean> {
        const key = IS_TYPING_DM_PREFIX + req.session.uid;
    
        await redis.set(key, receiverId);

        await pubsub.publish(NEW_TYPING_DM_EVENT, {
            senderId: req.session.uid,
            receiverId,
            isDm: true
        });

        return true;
    }

    @Query(() => [User])
    async recentChats(
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const result = [];

        const users = await getConnection().query(
            `
                select u.*, (

                    select max(d."createdAt") from direct_message as d
                    where (d."receiverId" = u.id or d."senderId" = u.id)
                    and (u.id != $1 or (d."receiverId" = $1 and d."senderId" = $1))
                    and (d."receiverId" = $1 or d."senderId" = $1) 

                ) as latest from "user" as u 
                order by latest DESC 
                limit 5
            `, 
            [req.session.uid]
        );

        for(let i=0;i<users.length;i++) {
            if(users[i].latest) {
                result.push(users[i]);
            }
        }

        return result;
    }

    @Mutation(() => Boolean)
    async editDirectMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('messageId', () => Int) messageId: number,
        @Arg('text') text: string
    ) : Promise<boolean> {
        const dm = await DirectMessage.findOne(messageId);
        const receiverId = dm?.receiverId;
        const senderId = dm?.senderId;

        await getConnection().query(
            `
                update direct_message set text = $1 
                where id = $2
            `,
            [text, messageId]
        );

        await pubsub.publish(NEW_DM_EVENT, {
            senderId,
            receiverId,
            isDm: true
        });

        return true;
    }

    @Mutation(() => Boolean)
    async sendDirectMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('receiverId', () => Int) receiverId: number,
        @Arg('text') text: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const senderId = req.session.uid;

        await getConnection().query(
            `
            insert into direct_message ("senderId", "receiverId", text)
            values ($1, $2, $3)
            `,
            [senderId, receiverId, text]
        );

        await pubsub.publish(NEW_DM_EVENT, {
            senderId,
            receiverId,
            isDm: true
        });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteDirectMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('messageId', () => Int) messageId: number
    ): Promise<boolean>{
        const dm = await DirectMessage.findOne(messageId);
        const receiverId = dm?.receiverId;
        const senderId = dm?.senderId;

        if(dm?.pic) {
            const location = path.join(__dirname, `../../images/${dm.pic}`);
            fs.unlink(location, () => {});
        }

        await getConnection().query(
            `
                delete from direct_message
                where id = $1
            `,
            [messageId]
        );

        await pubsub.publish(NEW_DM_EVENT, {
            senderId,
            receiverId,
            isDm: true
        });

        return true;
    }

    @Query(() => [DirectMessage])
    async directMessages(
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() { req }: MyContext
    ): Promise<DirectMessage[]>{
        const messages = await getConnection().query(
            `
                select * from direct_message
                where (direct_message."senderId" = $1 AND direct_message."receiverId"= $2)
                or (direct_message."senderId" = $2 AND direct_message."receiverId"= $1)
                order by direct_message."createdAt" DESC
            `,
            [req.session.uid, receiverId]
        );

        return messages;
    }

    @Mutation(() => Boolean)
    async sendDmFile(
        @PubSub() pubsub: PubSubEngine,
        @Arg('file', () => GraphQLUpload) { createReadStream, filename }: Upload,
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const name = 'DM-' + v4() + path.extname(filename);
        const senderId = req.session.uid;

        await getConnection().query(
            `
            insert into direct_message ("senderId", "receiverId", pic)
            values ($1, $2, $3)
            `,
            [senderId, receiverId, name]
        );

        await pubsub.publish(NEW_DM_EVENT, {
            senderId,
            receiverId,
            isDm: true
        });

        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )
    }

    
}

