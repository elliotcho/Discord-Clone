import 'dotenv/config';
import { createConnection } from 'typeorm';
import { User } from './entities/User';

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
}

main().catch(err => {
    console.log(err);
});