import{
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver
} from 'type-graphql';
import {MyContext, GraphQLUpload, Upload} from "../types";
import {getConnection} from "typeorm";
import {DirectMessage} from "../entities/DirectMessage";
import {createWriteStream} from 'fs';
import path from 'path';
import { v4 } from 'uuid';

@Resolver(DirectMessage)
export class directMessageResolver {
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

    @Mutation(()=> Boolean)
    async sendFile(
        @Arg('file', () => GraphQLUpload) {createReadStream, filename}: Upload,
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() {req}: MyContext
    ): Promise<boolean>{
        const name = 'DM-' + v4() + path.extname(filename);
        const senderId = req.session.uid;

        await getConnection().query(
            `
            insert into "directMessage" ('senderId', 'receiverId', pic)
            values ($1, $2, $3)
            `,
            [senderId, receiverId, name]
        );
        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )
    }
}
