import 'reflect-metadata';
import 'dotenv/config';
import { createSchema } from './utils/createSchema';
import { createDbConnection } from './utils/createDbConnection';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import http from 'http';
import path from 'path';
import cors from 'cors';

const main = async () => {
    await createDbConnection();

    const app = express();
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true
        })
    );

    app.use('/images', express.static(path.join(__dirname, '../images')));

    const sessionMiddleware = session({
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
    });

    app.use(sessionMiddleware);

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        uploads: { maxFileSize: 10000000, maxFiles: 10 },
        context: ({ req, res, connection }) => {
            return ({ req, res, redis, connection });
        },
        subscriptions: {
            path: '/subscriptions',
            onConnect: (_, ws: any) => {
                return new Promise(res => 
                    sessionMiddleware(ws.upgradeReq, {} as any, () => {
                        res({ req: ws.upgradeReq });
                    })
                );
            }
        }
    });

    apolloServer.applyMiddleware({ app, cors: false });
    const httpServer = http.createServer(app);

    apolloServer.installSubscriptionHandlers(httpServer);
    const port = process.env.PORT;

    httpServer.listen(port, () => {
        console.log(`listening to port ${port}`);
    });
}

main().catch(err => {
    console.log(err);
});