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
import { Read } from '../entities/Read';
import { filterSubscription } from '../utils/filterSubscription';
import { 
    GraphQLUpload, 
    MyContext, 
    Upload 
} from "../types";
import fs, { createWriteStream } from 'fs';
import path from 'path';

const NEW_MESSAGE_EVENT = 'NEW_MESSAGE_EVENT';

@Resolver(Message)
export class MessageResolver {
    @FieldResolver()
    async isRead(
        @Root() message: Message,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const isDM = false;
        
        const isRead = await Read.findOne({
            where: {
                userId: req.session.uid,
                messageId: message.id,
                isDM
            }
        });

        return !!isRead;
    } 

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
        topics: NEW_MESSAGE_EVENT,
        filter: filterSubscription
    })
    newMessage(): boolean {
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

        await getConnection().query(
            `
             insert into message ("channelId", "senderId", text)
             values ($1, $2, $3)
            `, 
            [channelId, req.session.uid, text]
        );

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
        @Arg('file', () => GraphQLUpload) {createReadStream, filename}: Upload,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        const name = 'MESSAGE-' +v4() + path.extname(filename);

        await getConnection().query(
            `
             insert into message ("channelId", "senderId", pic)
             values ($1, $2, $3)
            `, 
            [channelId, req.session.uid, name]
        );

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
        )
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