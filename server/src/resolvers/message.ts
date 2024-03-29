import {
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
    Subscription,
} from "type-graphql";
import { v4 } from 'uuid'; 
import { getConnection } from "typeorm";
import { Message } from "../entities/Message";
import { Channel } from "../entities/Channel";
import { User } from '../entities/User';
import { Seen } from '../entities/Seen';
import { Read } from '../entities/Read';
import { filterSubscription } from '../utils/filterSubscription';
import { 
    GraphQLUpload, 
    MyContext, 
    Upload 
} from "../types";
import fs, { createWriteStream } from 'fs';
import path from 'path';

const IS_TYPING_MESSAGE_PREFIX = 'IS_TYPING_MESSAGE_PREFIX';
const NEW_MESSAGE_READ_RECEIPT_EVENT = 'NEW_MESSAGE_READ_RECEIPT_EVENT';
const NEW_TYPING_MESSAGE_EVENT = 'NEW_TYPING_MESSAGE_EVENT';
const NEW_MESSAGE_EVENT = 'NEW_MESSAGE_EVENT';

@Resolver(Message)
export class MessageResolver {
    @FieldResolver()
    async pic(
        @Root() message: Message
    ) : Promise<string> {
        if(!message.pic) {
            return '';
        }

        return `${process.env.SERVER_URL}/images/${message.pic}`;
    }

    @FieldResolver(() => User)
    async user (
        @Root() message: Message
    ) : Promise<User | undefined> {
        return User.findOne(message.senderId);
    }

    @Subscription(() => Boolean, {
        topics: NEW_TYPING_MESSAGE_EVENT,
        filter: filterSubscription
    }) 
    newUserTypingMessage() : boolean {
        return true;
    }

    @Subscription(() => Boolean, {
        topics: NEW_MESSAGE_EVENT,
        filter: filterSubscription
    })
    newMessage(): boolean {
        return true;
    }

    @Subscription(() => Boolean, {
        topics: NEW_MESSAGE_READ_RECEIPT_EVENT,
        filter: filterSubscription
    })
    newMessageReadReceipt() : boolean {
        return true;
    }

    @Query(() => [User])
    async messageReadReceipts(
        @Arg('messageId', () => Int) messageId: Number,
        @Ctx() { req } : MyContext
    ): Promise<User[]> {
        const readReceipts = await getConnection().query(
            `
                select u.* from "user" as u
                inner join read as r on r."userId" = u.id
                where r."messageId" = $1 and u.id != $2
            `, [messageId, req.session.uid]
        );

        return readReceipts;
    }

    @Mutation(() => Boolean)
    async readChannelMessages(
        @PubSub() pubsub: PubSubEngine,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;
     
        const messages = await getConnection().query(
            `
                select m.* from message as m
                where m."channelId" = $1
            `, [channelId]
        )

        for(let i=0;i<messages.length;i++) {
            const { id: messageId } = messages[i];

            const isRead = await Read.findOne({ where: { 
                 userId: req.session.uid,
                 messageId
            }});

            if(!isRead) {
                await getConnection().query(
                    `
                        insert into read ("messageId", "userId")
                        values ($1, $2)
                    `, [messageId, uid]
                );
            }
        }

        await pubsub.publish(NEW_MESSAGE_READ_RECEIPT_EVENT, {
            senderId: uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true;
    }

    @Mutation(() => Boolean)
    async seeTeamMessages(
        @Arg('teamId', () => Int) teamId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const seen = await Seen.findOne({ where: { 
            userId: req.session.uid,
            teamId
        }});
        
        if(!seen) {
            await getConnection().query(
                `
                    insert into seen ("userId", "teamId")
                    values ($1, $2)
                `, [req.session.uid, teamId]
            );
        }

        return true;
    }

    @Query(() => [User])
    async usersTypingMessage(
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req, redis } : MyContext
    ) : Promise<User[]> {
        const result = [] as User[];
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        const members = await getConnection().query(
            `
                select * from member as m
                where m."userId" != $1
                and m."teamId" = $2
            `, [req.session.uid, teamId]
        );

        for(let i=0;i<members.length;i++){
            const key = IS_TYPING_MESSAGE_PREFIX + members[i].userId;
            const cachedId  = await redis.get(key);

            if(parseInt(cachedId!) === channelId) {
                const user = await User.findOne(members[i].userId);
                result.push(user!);
            }
        }

        return result;
    }

    @Mutation(() => Boolean)
    async stopTypingMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req, redis } : MyContext
    ) : Promise<boolean> {
        const key = IS_TYPING_MESSAGE_PREFIX + req.session.uid;
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        await redis.del(key);

        await pubsub.publish(NEW_TYPING_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true;
    }

    @Mutation(() => Boolean)
    async startTypingMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req, redis } : MyContext
    ) : Promise<boolean> {
        const key = IS_TYPING_MESSAGE_PREFIX + req.session.uid;
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        await redis.set(key, channelId);

        await pubsub.publish(NEW_TYPING_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true;
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('text') text: string,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req } : MyContext 
    ): Promise<boolean>{
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        await getConnection().transaction(async tm => {
            await tm.query(
                `
                 insert into message ("channelId", "senderId", text)
                 values ($1, $2, $3)
                `, 
                [channelId, req.session.uid, text]
            );
    
            await tm.query(
                `
                    delete from seen as s
                    where s."userId" != $1 and
                    s."teamId" = $2
                `, [req.session.uid, teamId]
            );
        });

        await pubsub.publish(NEW_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true;
    }

    @Query(() => [Message])
    async messages(
        @Arg('channelId', () => Int) channelId: number,
    ): Promise<Message | undefined> {
        const messages = await getConnection().query(
            `
                select * from message
                where message."channelId" = $1
                order by message."createdAt" DESC
            `, [channelId]
        );

        return messages;
    }

    @Mutation(() => Boolean)
    async deleteMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('channelId', () => Int) channelId: number,
        @Arg('messageId', () => Int) messageId: number,
        @Ctx() { req } : MyContext
    ) : Promise<Boolean> {
        const message = await Message.findOne(messageId);
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        if(message?.pic) {
            const location = path.join(__dirname, `../../images/${message.pic}`);
            fs.unlink(location, () => {});
        }

        await getConnection().query(
            `
                delete from message
                where message.id = $1
            `, 
            [messageId]
        );

        await pubsub.publish(NEW_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true; 
    }

    @Mutation(() => Boolean)
    async sendFile(
        @PubSub() pubsub: PubSubEngine,
        @Arg('file', () => GraphQLUpload) { createReadStream, filename }: Upload,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        const name = 'MESSAGE-' +v4() + path.extname(filename);

        await getConnection().transaction(async (tm) => {
            await tm.query(
                `
                 insert into message ("channelId", "senderId", pic)
                 values ($1, $2, $3)
                `, 
                [channelId, req.session.uid, name]
            );
    
            await tm.query(
                `
                    delete from seen as s
                    where s."userId" != $1 and
                    s."teamId" = $2
                `, [req.session.uid, teamId]
            );    
        })
   
        await pubsub.publish(NEW_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });


        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        );
    }

    @Mutation(() => Boolean)
    async editMessage(
        @PubSub() pubsub: PubSubEngine,
        @Arg('channelId', () => Int) channelId: number,
        @Arg('messageId', () => Int) messageId: number,
        @Arg('text') text: string,
        @Ctx() { req } : MyContext
    ) : Promise<Boolean> {
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        await getConnection().query(
            `
                update message
                set text = $1
                where id = $2
            `, 
            [text, messageId]
        );

        await pubsub.publish(NEW_MESSAGE_EVENT, {
            senderId: req.session.uid,
            receiverId: channelId,
            isDm: false,
            teamId
        });

        return true; 
    }
}