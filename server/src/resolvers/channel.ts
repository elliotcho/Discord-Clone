import { 
    Resolver,
    Query, 
    Arg,
    Int
} from "type-graphql";
import { Channel } from "../entities/Channel";

@Resolver(Channel)
export class ChannelResolver {
    @Query(() => [Channel])
    async channels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        return Channel.find({ teamId });
    }
}