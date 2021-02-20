import { 
    Arg,
    Ctx,
    Mutation,  
    Query,  
    Resolver,
} from "type-graphql";
import argon2 from 'argon2';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { MyContext } from "src/types";
import { sendEmail } from "../utils/sendEmail"

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async me(
        @Ctx() { req } : MyContext
    ) : Promise<User | undefined> {
        return User.findOne(req.session.uid);
    }

    @Mutation(() => Boolean)
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        const user = await User.findOne({ where: { username } });

        if(!user) {
            return false;
        }
        
        const valid = await argon2.verify(user.password, password);

        if(!valid) {
            return false;
        }

        req.session.uid = user.id;
        return true;
    }

    @Mutation(() => User)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Arg('email') email: string,
        @Ctx() { req } : MyContext 
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

        req.session.uid = user?.id;
        
        return user;
    }

    @Mutation(()=> Boolean)
    async changePassword(
        @Arg('currentPassword') currPassword: string,
        @Arg('newPassword') newPassword: string,
        @Arg('username') username: string
    ): Promise<boolean>{
        const user = await User.findOne({ where: { username } });

        if(!user){
            return false;
        }

        const comparePassword = await argon2.verify(user.password, currPassword);

        if(!comparePassword){
            return false;
        }

        const hashedNewPassword = await argon2.hash(newPassword);

        await getConnection().query(
            `
            update "user" 
            set password = $1
            where username = $2
            `,
            [hashedNewPassword, username]
        );

        return true;
    }

    @Mutation(()=>Boolean)
    async forgotPassword(
        @Arg('newPassword') newPassword: string,
        @Arg('username') username: string,
    ): Promise<boolean>{
        const hashedPassword = await argon2.hash(newPassword);

        await getConnection().query(
            `
            update "user"
            set password = $1
            where username = $2
            `,
            [hashedPassword, username ]
        );
        return true;
    }

    @Mutation(() => String)
    async sendForgotPasswordEmail(
        @Arg('username') username: string,
    ): Promise<boolean>{
        const user = await User.findOne({where: {username}});
         if(!user){
             return false;
         }
         //send the email using user.email
         sendEmail(user.email, "PLEASE CLICK HERE TO RESET");
         return true;
    }
}