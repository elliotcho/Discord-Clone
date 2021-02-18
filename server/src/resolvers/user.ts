import { 
    Arg,
    Mutation, 
    Resolver,
    Query
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";


@Resolver()
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
    async users(): Promise<User[]> {
        const users = await getConnection().query(
            `select * from "user"`
        );

        return users; 
    }
    
    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('username') username: string
    ): Promise<boolean> {
        await getConnection().query(
            `
                delete from "user" where username =$1
            `,
            [username]
        )
        return true;
    } 

    @Mutation(() => Boolean)
    async signIn(
        @Arg('username') username: string,
        @Arg('password') password: string
    ): Promise<boolean> {
        const user = await User.findOne({ where: { username: username } });
        if(user?.password === password){
            return true;
        } else{
            return false;
        }
    }

}

