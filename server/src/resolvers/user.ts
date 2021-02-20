import { 
    Arg,
    Mutation,  
    Resolver,
} from "type-graphql";
import argon2 from 'argon2';
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver(User)
export class UserResolver {
    @Mutation(() => Boolean)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string
    ): Promise<boolean> {
        const user = await User.findOne({ where: { username } });

        if(!user) {
            return false;
        }
        
        const valid = await argon2.verify(user.password, password);

        if(!valid) {
            return false;
        }

        return true;
    }

    @Mutation(() => User)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Arg('email') email: string    
    ): Promise<User | undefined>{
        const hashedPassword = await argon2.hash(password);

        await getConnection().query(
            `
             insert into "user" (username, password, email) 
             values ($1, $2, $3)
            `,
            [username, hashedPassword, email]
        );
        
        const user = await User.findOne({ where : { username } });
        return user;
    }

}

