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
import { Team } from '../entities/Team';
import { MyContext } from "../types";

@Resolver(Channel)
export class ChannelResolver {
    @FieldResolver(() => Boolean)
    async isOwner(
        @Root() { teamId } : Channel,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const team = await Team.findOne(teamId);
        const ownerId = team?.ownerId;

        return req.session.uid === ownerId;
    }

    @Mutation(() => Boolean)
    async editChannelName(
        @Arg('channelId', () => Int) channelId: number,
        @Arg('newName') newName: string
    ) : Promise<boolean> {
        const channel = await Channel.findOne(channelId);
        const { name } = channel!;

        if(name === newName) {
            return false;
        }

        await Channel.update({ id: channelId }, { name: newName });
        return true;
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
                insert into channel (name, "teamId", "isOriginal")
                values ($1, $2, $3)
            `,
            [channelName, teamId, false] 
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
}