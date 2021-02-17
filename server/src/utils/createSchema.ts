import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { HelloResolver } from '../resolvers/hello'; 

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            HelloResolver,
            UserResolver
        ]
    })
)