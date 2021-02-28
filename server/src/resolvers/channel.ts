import { 
    Resolver,
    Query, 
    Arg,
    Int,
    Mutation
} from "type-graphql";
import { getConnection } from "typeorm";
import { Channel } from "../entities/Channel";

@Resolver(Channel)
export class ChannelResolver {
    @Query(() => [Channel])
    async channels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        return Channel.find({ teamId });
    }

    @Mutation(() => Channel)
    async createChannel(
        @Arg('name') name: string

    ): Promise<Channel | undefined> {
        
        await getConnection().query(
            `
                insert into "name" (name)
                values($1)
            `,
            [name]
        )
        
        return Channel.create({ name });
    }

}

