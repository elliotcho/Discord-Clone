import { 
    Arg,
    Ctx,
    Mutation,  
    Query,  
    Resolver,
} from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import argon2 from 'argon2';
import { v4 } from 'uuid';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { MyContext, Upload } from "../types";
import { sendEmail } from "../utils/sendEmail"
import { createWriteStream } from 'fs';
import path from 'path';

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async me(
        @Ctx() { req } : MyContext
    ) : Promise<User | undefined> {
        return User.findOne(req.session.uid);
    }

    @Mutation(() => Boolean)
    async updateProfilePic(
        @Arg('file', () => GraphQLUpload) { createReadStream, filename } : Upload,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        const name = 'PROFILE-' + v4() + path.extname(filename);

        await User.update({ id: req.session.uid }, { profilePic: name });

        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )
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

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis } : MyContext
    ) : Promise<boolean> {
        const user = await User.findOne({ where : { email }});

        if(!user){
            return true;
        }

        const token = v4();
        const href = `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`;
        const expiresIn = 1000 * 60 * 60 * 24 * 3; //3 days

        await redis.set(token, user.id, 'ex', expiresIn);
        await sendEmail(email, href);

        return true;
    }
}