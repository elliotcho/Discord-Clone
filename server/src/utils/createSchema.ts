import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { TeamResolver } from '../resolvers/team';
import { ChannelResolver } from '../resolvers/channel';
import { MessageResolver } from '../resolvers/message';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            TeamResolver,
            UserResolver,
            ChannelResolver,
            MessageResolver
        ]
    })
)