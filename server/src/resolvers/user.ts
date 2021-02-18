import { User } from "../entities/User";
import { 
    Arg,
    Mutation, 
    Query, 
    Resolver,
    ObjectType, 
    Field
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver(User)
export class UserResolver {
    @Mutation(()=>Boolean)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Arg('email') email: string    
    ): Promise<boolean>{
        await getConnection().query(
            `
            insert into "user" (username, password, email) values ('${username}', '${password}', '${email}')
            `
        );

        return true;
    }
}