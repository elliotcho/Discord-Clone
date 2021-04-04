import { createConnection } from 'typeorm';
import { Message } from '../entities/Message';
import { Member } from '../entities/Member';
import { Channel } from '../entities/Channel';
import { Friend } from '../entities/Friend';
import { Team } from '../entities/Team';
import { User } from '../entities/User';
import { DirectMessage } from '../entities/DirectMessage';
import { Read } from '../entities/Read';

export const createDbConnection = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: true,
        entities: [
            User,
            Member,
            Message,
            Friend,
            Channel,
            Team,
            DirectMessage,
            Read
        ] 
    });

}