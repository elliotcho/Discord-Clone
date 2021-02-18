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

@ObjectType()
class UserList{
    @Field(()=>User)
    users: User[]
}

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

    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('username') username: string
    ): Promise<boolean>{
         await getConnection().query(
            `
            delete from "user" where username = $1
            `,
            [username]
        );
        return true;
    }



    @Query(()=>[User])
    async getUsers() : Promise<[User]>{
        const users = await getConnection().query(
            `
            select * from "user"
            `
        );
        return users;
        
    }

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