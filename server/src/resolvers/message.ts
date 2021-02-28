import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import {MyContext} from "../types";
import {GraphQLUpload} from 'graphql-upload';
import {v4} from 'uuid';
import {getConnection} from "typeorm";
import {Message} from "../entities/Message";

@Resolver(Message)
export class MessageResolver {
    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('message') message: string,
        @Arg('channelID', ()=>Int) channelID: number,
        @Ctx() { req } : MyContext 
    ): Promise<boolean>{
        const senderID = req.session.uid;
        await getConnection().query(
            `
             insert into "message" (message, senderID, channelID)
             values($1,$2,$3)
            `, 
            [message, senderID, channelID]
        );
        return true;

    }

    @Query(() => [Message])
    async getMessages(
        @Arg('channelID', () => Int) channelID: number,
    ): Promise<Message | undefined> {
        const messages = await getConnection().query(
            `
            select (message,createdAt, edited) from "message"
            where channelID=$1
            `, [channelID]
        );
        return messages;
    }
}