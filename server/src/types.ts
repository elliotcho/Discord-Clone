import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

import { GraphQLError, GraphQLScalarType } from 'graphql';
import { Stream } from 'stream';

export type MyContext = {
    req: Request & { session: Session & { uid? : number} };
    res: Response;
    connection: any;
    redis: Redis;
}

export type Upload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream(): Stream;
}

export const GraphQLUpload =  new GraphQLScalarType({
    name: 'Upload',
    description: 'The `Upload` scalar type represents a file upload.',
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        throw new GraphQLError('Upload literal unsupported.', ast);
    },
    serialize() {
        throw new GraphQLError('Upload serialization unsupported.');
    },
});

export type SubscriptionPayload = {
    senderId: number;
    receiverId: number;
    teamId?: number;
    isDm: boolean;
}