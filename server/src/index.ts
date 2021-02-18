import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { createSchema } from './utils/createSchema';
import { User } from './entities/User';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

const main = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: true,
        entities: [
            User
        ] 
    });
   

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        context: ({ req, res }) => ({ req, res, redis }),
        schema
    });

    const app = express();
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        session({
            name: 'cid',
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true,
                sameSite: 'lax', //csrf
                secure: false    //includes http
            },
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false
        })
    );

    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    });
}

main().catch(err => {
    console.log(err);
});