import { MyContext } from "../types";
import { 
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver
} from "type-graphql";
import { getConnection } from "typeorm";
import { Friend } from "../entities/Friend";
import { User } from '../entities/User';

@Resolver(Friend)
export class FriendResolver {
    @Query(() => [User])
    async friendRequests(
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const friendRequests = await getConnection().query(
            `
                select u.* from "user" as u inner join friend as f 
                on (u.id = f."receiverId" or u.id = f."senderId")
                where f.status = false and f."receiverId" = $1 and
                u.id = f."senderId"
            `, [req.session.uid]
        );

        return friendRequests;
    }

    @Query(() => [User])
    async friends(
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const friends = await getConnection().query(
            `
                select u.* from "user" as u inner join friend as f 
                on u.id = f."senderId" or u.id = f."receiverId"
                where (f."senderId" = $1 or f."receiverId" = $1) and u.id != $1
                and f.status = true
            `,[req.session.uid]
        );

        return friends;
    }

    @Mutation(() => Boolean)
    async removeFriend(
        @Arg('friendId', () => Int) friendId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().transaction(async tm => {
            await tm.query(
                `
                    delete from friend as f
                    where f.status = true
                    and (f."receiverId" = $1 and f."senderId" = $2) 
                    or (f."senderId" = $1 and f."receiverId" = $2)
                `,
                [friendId, uid]
            );
        });

        return true;
    }

    @Mutation(() => Boolean)
    async acceptFriendRequest(
        @Arg('senderId', () => Int) senderId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        
        await getConnection().transaction(async tm => {
            await tm.query(
                `
                    update friend
                    set status = true
                    where "senderId" = $1 and
                    "receiverId" = $2
                `, [senderId, uid]
            );

            await tm.query(
                `
                    delete from friend
                    where "senderId" = $1
                    and "receiverId" = $2
                    and status = false
                `, [uid, senderId]
            );
        });

        return true;
    }

    @Mutation(() => Boolean)
    async cancelFriendRequest(
        @Arg('receiverId', () => Int) receiverId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().query(
            `
                delete from friend
                where "senderId" = $1
                and "receiverId" = $2
            `,
            [uid, receiverId]
        );

        return true;
    }

    @Mutation(() => Boolean)
    async declineFriendRequest(
        @Arg('senderId', () => Int) senderId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().query(
            `
                delete from friend 
                where "senderId" = $1
                and "receiverId" = $2
                and status = false
            `,[senderId, uid]
        );

        return true;
    }

    @Mutation(() => Boolean)
    async sendFriendRequest(
        @Arg('receiverId', () => Int) receiverId: number,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        const { uid } = req.session;

        await getConnection().query(
            `
                insert into friend ("receiverId", "senderId")
                values ($1, $2)
            `, [receiverId, uid]
        );

        return true;
    }

    @Query(() => [User])
    async getUserGroup(
        @Arg('status', () => Int) status: number,
    ): Promise<User[]>{
        const group = await getConnection().query(
            `
            select * from user
            where status = $1
            `,
            [status]
        );
        return group;
    }
}