import{
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver
} from 'type-graphql';
import {MyContext} from "../types";
import {getConnection} from "typeorm";
import {DirectMessage} from "../entities/DirectMessage";

@Resolver(DirectMessage)
export class DirectMessageResolver {
    @Mutation(()=> Boolean)
    async sendMessage(
        @Arg('text') text: string,
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() {req}: MyContext
    ): Promise<boolean>{
        const senderId = req.session.uid;

        await getConnection().query(
            `
            insert into "directMessage" ("senderId", "receiverId", text)
            values ($1, $2, $3)
            `,
            [senderId, receiverId, text]
        );
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMessage(
        @Arg('messageId', () => Int) messageId: number
    ): Promise<boolean>{
        await getConnection().query(
            `
            delete from "directMessage"
            where "directMessage".id = $1
            `,
            [messageId]
        );
        return true;
    }

    @Query(() => [DirectMessage])
    async retrieveMessages(
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() {req}: MyContext
    ): Promise<DirectMessage | undefined>{
        const messages = await getConnection().query(
            `
            select * from "directMessage"
            where "directMessage.senderId" = $1 AND "directMessage.receiverId"= $2
            order by 'directMessage.createdAt"
            `,
            [req.session.uid, receiverId]
        );
        return messages;
    }
}
