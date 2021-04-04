import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { GraphQLUpload, MyContext, Upload } from "../types";
import { getConnection } from "typeorm";
import { Message } from "../entities/Message";
import { User } from '../entities/User';
import { v4 } from "uuid";
import path from 'path';
import {createWriteStream} from 'fs';

@Resolver(Message)
export class MessageResolver {
    @FieldResolver(() => User)
    async user (
        @Root() message: Message
    ) : Promise<User | undefined> {
        return User.findOne(message.senderId);
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('text') text: string,
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req } : MyContext 
    ): Promise<boolean>{
        const senderId = req.session.uid; 

        await getConnection().query(
            `
             insert into message (text, "channelId", "senderId")
             values ($1, $2, $3)
            `, 
            [text, channelId, senderId]
        );

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
                order by message."createdAt"
            `, [channelId]
        );

        return messages;
    }

    @Mutation(() => Boolean)
    async deleteMessage(
        @Arg('messageId', () => Int) messageId: number
    ) : Promise<Boolean> {

        await getConnection().query(
            `
                delete from message
                where message.id = $1
            `, 
            [messageId]
        )

        return true; 
    }

    @Mutation(() => Boolean)
    async sendFile(
        @Arg('file', () => GraphQLUpload) {createReadStream, filename}: Upload,
        @Arg('channelId', ()=> Int) channelId: number,
        @Ctx() {req}: MyContext
    ): Promise<boolean>{
        const name = 'MESSAGE-' +v4() + path.extname(filename);
        const senderId = req.session.uid;

        await getConnection().query(
            `
            insert into message ("senderId", "channelId", pic)
            values ($1, $2, $3)
            `,
            [senderId, channelId, name]
        );

        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )

        
    }
}