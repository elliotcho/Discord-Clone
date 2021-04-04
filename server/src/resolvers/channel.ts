import { MyContext } from "src/types";
import { 
    Resolver,
    Query, 
    Arg,
    Int,
    Mutation,
    Ctx,
    FieldResolver,
    Root
} from "type-graphql";
import { getConnection } from "typeorm";
import { Channel } from "../entities/Channel";
import {Read} from "../entities/Read";

@Resolver(Channel)
export class ChannelResolver {
    @FieldResolver()
    async read(
        @Root() channel: Channel,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        const response = await Read.findOne({
            where: {
                channelId: channel.id, 
                userId: req.session.uid
            }
        });

        return !!response;
    }

    @Query(() => [Channel])
    async channels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        return Channel.find({ teamId });
    }

    @Mutation(() => Boolean)
    async createChannel(
        @Arg('channelName') channelName: string,
        @Arg('teamId', () => Int) teamId: number
    ): Promise<Boolean> {
        
        await getConnection().query(
            `
                insert into channel (name, "teamId")
                values ($1, $2)
            `,
            [channelName, teamId] 
        );
        
        return true;
    }

    @Mutation(() => Boolean)
    async deleteChannel(
        @Arg('channelId', () => Int) channelId: number
    ) : Promise<Boolean> {
        await getConnection().query(
            `
                delete from channel where
                channel.id = $1 
            `,
            [channelId]
        )

        return true;
    }

    @Query(() => Channel)
    async channel(
        @Arg('channelId', () => Int) channelId: number
    ) : Promise<Channel | undefined> {
        return Channel.findOne(channelId)
    }

    @Mutation(() => Boolean)
    async updateRead(
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        await getConnection().query(
            `
                insert into read ("channelId", "userId")
                VALUES($1, $2)
            `,
            [channelId, req.session.uid]
        );
        
        return true;
    }
}