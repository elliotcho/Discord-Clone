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
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import { Message } from "../entities/Message";
import { User } from '../entities/User';

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
}