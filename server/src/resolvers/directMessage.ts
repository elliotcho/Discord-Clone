import{
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root
} from 'type-graphql';
import { MyContext, GraphQLUpload, Upload } from "../types";
import { getConnection } from "typeorm";
import { DirectMessage } from "../entities/DirectMessage";
import { User } from '../entities/User';
import { Read } from "../entities/Read";
import fs, { createWriteStream } from 'fs';
import path from 'path';
import { v4 } from 'uuid';

@Resolver(DirectMessage)
export class DirectMessageResolver {
    @FieldResolver()
    async isRead(
        @Root() dm : DirectMessage,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const isRead = await Read.findOne({
            where: {
                messageId: dm.id,
                userId: req.session.uid,
                isDM: true
            }
        });

        return !!isRead;
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

    @Mutation(() => Boolean)
    async editDirectMessage(
        @Arg('text') text: string,
        @Arg('messageId', () => Int) messageId: number
    ) : Promise<boolean> {
        await getConnection().query(
            `
                update direct_message set text = $1 
                where id = $2
            `,[text, messageId]
        );

        return true;
    }

    @Mutation(() => Boolean)
    async sendDirectMessage(
        @Arg('text') text: string,
        @Arg('receiverId', () => Int) receiverId: number,
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

        return true;
    }

    @Mutation(() => Boolean)
    async deleteDirectMessage(
        @Arg('messageId', () => Int) messageId: number
    ): Promise<boolean>{
        const dm = await DirectMessage.findOne(messageId);

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
        @Arg('file', () => GraphQLUpload) { createReadStream, filename }: Upload,
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() {req}: MyContext
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

        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )
    }
}
