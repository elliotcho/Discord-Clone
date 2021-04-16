import { getConnection } from 'typeorm';
import { Member } from '../entities/Member';

export const isTeammate = async (
    userId: number,
    myId: number
) : Promise<boolean> => {
    const teams = await getConnection().query(
        `
            select t.* from team as t
            inner join member as m on m."teamId" = t.id
            where m."userId" = $1
        `, [myId]
    );

    for(let i=0;i<teams.length;i++) {
        const isMember = await Member.findOne({ where: { 
             teamId: teams[i].id,
             userId
        }});

        if(!!isMember) {
            return true;
        }
    } 

    return false;
}