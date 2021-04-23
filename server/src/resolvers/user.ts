  import { 
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,  
    ObjectType,  
    PubSub,  
    PubSubEngine,  
    Query,  
    Resolver,
    Root,
    Subscription
} from "type-graphql";
import argon2 from 'argon2';
import { v4 } from 'uuid';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { MyContext, GraphQLUpload, Upload } from "../types";
import { sendEmail } from "../utils/sendEmail"
import fs, { createWriteStream } from 'fs';
import path from 'path';

const CHANGE_ACTIVE_STATUS_EVENT = 'CHANGE_ACTIVE_STATUS_EVENT';

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors? : FieldError[];
    @Field(() => User, { nullable: true })
    user? : User;
}

@Resolver(User)
export class UserResolver {
    @FieldResolver(() => String)
    async profileURL (
        @Root() user : User
    ) : Promise<string> {
        if(user && user.profilePic) {
            return `${process.env.SERVER_URL}/images/${user.profilePic}`;
        }

        return `${process.env.SERVER_URL}/images/default.png`
    }

    @FieldResolver(() => Boolean)
    isMe(
        @Root() user: User,
        @Ctx() { req } : MyContext
    ) : boolean {
        return req.session.uid === user.id;
    }

    @FieldResolver(() => Int)
    async friendStatus(
        @Root() user : User,
        @Ctx() { req } : MyContext
    ) : Promise<0 | 1 | 2> {
        const { uid } =  req.session;

        const friends = await getConnection().query(
            `
                select * from friend as f
                where (f."senderId" = $1 or f."receiverId" = $1) and
                (f."receiverId" = $2 or f."senderId" = $2)
            `, 
            [uid, user.id]
        );

        if(!friends.length) {
            return 0;
        }

        if(!friends[0].status) {
            return 1;
        }

        return 2;
    }

    @Subscription(() => User, {
        nullable: true,
        topics: CHANGE_ACTIVE_STATUS_EVENT,
        filter: async ({ payload, context }) => {
            const { req } = context.connection.context;
            context.req = req;

            if(req.session.uid === payload.userId) {
                return false;
            }
        
            const isFriend = await getConnection().query(
                `
                    select * from friend as f
                    where (f."senderId" = $1 or f."receiverId" = $1) and
                    (f."receiverId" = $2 or f."senderId" = $2)
                    and f.status = true
                `,
                [req.session.uid, payload.userId]
            );

            return !!isFriend.length;
        }
    })
    async newStatusUpdate(
        @Root() { userId } : { userId: number }
    ) : Promise<User | undefined> {
        return User.findOne(userId);
    }

    @Query(() => User)
    async user(
        @Arg('userId', () => Int, { nullable: true })  userId: number,
        @Ctx() { req } : MyContext
    ): Promise<User | undefined> {
        let user: User | undefined;

        if(userId) {
            user = await User.findOne(userId);
            return user;
        }

        user = await User.findOne(req.session.uid);
        return user;
    }

    @Query(() => [User])
    async searchResults(
        @Arg('query') query: string
    ) : Promise<User[]> {
        let pattern = query.toLowerCase();

        const users = await getConnection().query(
            `
                select * from "user" as u where
                LOWER(u.username) LIKE '%${pattern}%'
            `
        );

        return users;
    }

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req } : MyContext
    ) : Promise<User | undefined> {
        if(!req.session.uid) {
            return undefined;
        }

        return User.findOne(req.session.uid);
    }

    @Mutation(() => Boolean)
    async logout (
        @PubSub() pubsub: PubSubEngine,
        @Ctx() { req, res } : MyContext
    ) : Promise<boolean> {
        await User.update({ id: req.session.uid }, { activeStatus: 0 });

        await pubsub.publish(CHANGE_ACTIVE_STATUS_EVENT, {
            userId: req.session.uid
        });

        return new Promise(resolve => {
            req.session.destroy(err => {
                res.clearCookie('cid');

                if(err) {
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    }

    @Mutation(() => Boolean)
    async removeProfilePic(
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        const user = await User.findOne(uid);
        
        if(user?.profilePic) {
            const location = path.join(__dirname, `../../images/${user.profilePic}`);

            fs.unlink(location, err => {
                if(err) {
                    console.log(err);
                }
            });

            await User.update({ id: uid }, { profilePic: '' });
        }

        return true;
    }

    @Mutation(() => Boolean)
    async updateProfilePic(
        @Arg('file', () => GraphQLUpload) { createReadStream, filename } : Upload,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        let user;
        const name = 'PROFILE-' + v4() + path.extname(filename);
        const { uid } = req.session;

        user = await User.findOne(uid);

        if(user && user.profilePic) {
            const location = path.join(__dirname, `../../images/${user.profilePic}`);

            fs.unlink(location, err => {
                if(err) {
                     console.log(err);
                }
            });
        }
        
        await User.update({ id: uid }, { profilePic: name });

        return new Promise(async (resolve, reject) =>
            createReadStream()
           .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
           .on('finish', () => resolve(true))
           .on('error', () => reject(false))
        )
    }

    @Mutation(() => UserResponse)
    async login(
        @PubSub() pubsub: PubSubEngine,
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { req } : MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne({ where: { username } });

        if(!user) {
            return {
                errors: [{
                    field: 'username',
                    message: 'Username is not registred'
                }]
            };
        }
        
        const valid = await argon2.verify(user.password, password);

        if(!valid) {
            return {
                errors: [{
                    field: 'password',
                    message: 'Incorrect password'
                }]
            };
        }
        
        await User.update({ id: user.id }, { activeStatus: 2 });

        await pubsub.publish(CHANGE_ACTIVE_STATUS_EVENT, {
            userId: user.id
        });

        req.session.uid = user.id;
        return { user };
    }

    @Mutation(() => UserResponse)
    async register(
        @PubSub() pubsub: PubSubEngine,
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Arg('email') email: string,
        @Ctx() { req } : MyContext 
    ): Promise<UserResponse>{
        const hashedPassword = await argon2.hash(password);
        let user;
        
        try { 
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username,
                password: hashedPassword,
                email   
            })
            .returning('*')
            .execute();

            user = result.raw[0];
        } catch (err) {
            if(err.code === '23505') {
                return {
                    errors: [{
                        field: 'email',
                        message: 'email or username already exists'
                    }]
                }
            }
        }

        await User.update({ id: user.id }, { activeStatus: 2 });

        await pubsub.publish(CHANGE_ACTIVE_STATUS_EVENT, {
            userId: user.id
        });

        req.session.uid = user.id;
        return { user };
    }

    @Mutation(()=> UserResponse)
    async changePassword(
        @PubSub() pubsub: PubSubEngine,
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { req, redis } : MyContext
    ): Promise<UserResponse>{
        const uid = await redis.get(token);

        if(!uid){
            return {
                errors: [{
                    field: 'token',
                    message: 'token expired'
                }]
            };
        }

        const user = await User.findOne(parseInt(uid));


        if(!user){
            return {
                errors: [{
                    field: 'token',
                    message: 'user no longer exists'
                }]
            };
        }

        await User.update({ id: user.id }, { 
            password: await argon2.hash(newPassword),
            activeStatus: 2
        });
    
        await pubsub.publish(CHANGE_ACTIVE_STATUS_EVENT, {
            userId: user.id
        });

        req.session.uid = user.id;
        await redis.del(token);

        return { user };
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

    @Mutation(() => Boolean)
    async changeUsername(
        @Arg('username') username: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const user = await User.findOne({ where: { username }});

        if(user){
            return false;
        }

        await getConnection().query(
            `
                update "user"
                set username = $1
                where id = $2
            `,
            [username, req.session.uid]
        );
        
       return true;
    }

    @Mutation(() => Boolean)
    async setStatus(
        @PubSub() pubsub: PubSubEngine,
        @Arg('status', () => Int) status: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean>{
        await getConnection().query(
            `
                update "user"
                set "activeStatus" = $1
                where id = $2
            `,
            [status, req.session.uid]
        );

        await pubsub.publish(CHANGE_ACTIVE_STATUS_EVENT, {
            userId: req.session.uid
        });

        return true;
    }
}