import { createConnection } from 'typeorm';
import { Message } from '../entities/Message';
import { Member } from '../entities/Member';
import { Channel } from '../entities/Channel';
import { Team } from '../entities/Team';
import { User } from '../entities/User';

export const createDbConnection = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: false,
        entities: [
            User,
            Member,
            Message,
            Channel,
            Team
        ] 
    });
}