import { 
    Arg,
    Mutation, 
    Query, 
    Resolver
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver(User)
export class UserResolver {
    @Mutation(() => Boolean)
    async createDummyUser(
        @Arg('username') username: string
    ) : Promise<boolean> {
        await getConnection().query(
            `
                insert into "user" (username) values ('${username}')
            `
        );

        return true;
    }

    @Query(() => [User])
    async users() : Promise<User[]> {
        const users = await getConnection().query(
            `select * from "user"`
        );

        return users;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('username') username: string
    ) : Promise<boolean> {
        await getConnection().query(
            `
              delete from "user" where username = $1
            `,
            [username]
        );

        return true;
    }
}