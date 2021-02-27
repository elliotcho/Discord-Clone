import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { TeamResolver } from '../resolvers/team';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            TeamResolver,
            UserResolver
        ]
    })
)