import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { TeamResolver } from '../resolvers/team';
import { MessageResolver } from '../resolvers/message';
import { ChannelResolver } from '../resolvers/channel';
import { FriendResolver } from '../resolvers/friend';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            MessageResolver,
            TeamResolver,
            UserResolver,
            ChannelResolver,
            FriendResolver
        ]
    })
)