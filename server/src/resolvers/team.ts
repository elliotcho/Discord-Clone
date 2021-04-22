import { 
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation, 
    Query, 
    Resolver, 
    Root
} from "type-graphql";
import { v4 } from 'uuid';
import { getConnection } from "typeorm";
import { Member } from "../entities/Member";
import { Channel } from '../entities/Channel';
import { Team } from "../entities/Team";
import { User } from '../entities/User';
import { Read } from '../entities/Read';
import { Seen } from '../entities/Seen';
import { 
    MyContext,
    GraphQLUpload,
    Upload
} from "../types";
import fs, { createWriteStream } from 'fs';
import path from 'path';

@Resolver(Team)
export class TeamResolver {
    @FieldResolver(() => String)
    async photo (
        @Root() team: Team
    ) : Promise<string> {
        if(team && team.photo) {
            return `${process.env.SERVER_URL}/images/${team.photo}`;
        }

        return '';
    }

    @FieldResolver(() => Boolean) 
    isOwner(
        @Root() { ownerId } : Team,
        @Ctx() { req } : MyContext
    ) : boolean {
        return ownerId === req.session.uid;
    }

    @FieldResolver(() => [Channel])
    async channels(
        @Root() team: Team
    ) : Promise<Channel[]> {
        return Channel.find({ teamId: team.id });
    }

    @FieldResolver(() => Int)
    async unreadMessages(
        @Root() { id: teamId } : Team,
        @Ctx() { req } : MyContext,
    ) : Promise<number> {
        let total = 0;
        
        let seen = await Seen.findOne({ where: { 
            userId: req.session.uid,
            teamId
        }});

        if(!!seen) {
            return total;
        }

        const messages = await getConnection().query(
            `
                select m.* from message as m
                inner join channel as c on c.id = m."channelId"
                inner join team as t on t.id = c."teamId"
                where t.id = $1  
            `, [teamId]
        );

        for(let i=0;i<messages.length;i++) {
            let isRead = await Read.findOne({ where: { 
                messageId: messages[i].id,
                userId: req.session.uid,
            }});

            if(!isRead) total++;
        }

        return total;
    }

    @Mutation(() => Boolean)
    async removeTeamPhoto(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<boolean> {
        const team = await Team.findOne(teamId);

        if(team?.photo) {
            const location = path.join(__dirname, `../../images/${team.photo}`);

            fs.unlink(location, err => {
                if(err) {
                    console.log(err);
                }
            });

            await Team.update({ id: teamId }, { photo: '' });
        }

        return true;
    }

    @Mutation(() => Boolean)
    async updateTeamPhoto(
        @Arg('file', () => GraphQLUpload) { createReadStream, filename }: Upload,
        @Arg('teamId', () => Int) teamId: number,
    ) : Promise<boolean> {
        const team = await Team.findOne(teamId);
        const name = 'TEAM-' + v4() + path.extname(filename);

        if(team?.photo) {
            const location = path.join(__dirname, `../../images/${team.photo}`);

            fs.unlink(location, err => {
                if(err) {
                     console.log(err);
                }
            });
        }
        
        await Team.update({ id: teamId }, { photo: name });

        return new Promise(async (resolve, reject) =>
            createReadStream()
            .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false))
        );
    }

    @Mutation(() => Boolean)
    async editTeamName(
        @Arg('teamId', () => Int) teamId: number,
        @Arg('newName') newName: string
    ) : Promise<boolean> {
        try {
            await Team.update({ id: teamId }, { name: newName });
        } catch {
            return false;
        }

        return true;
    }

    @Mutation(() => Boolean)
    async deleteTeam(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<boolean> {
        try {
            await Team.delete({ id: teamId });
        } catch {
            return false;
        }

        return true;
    }

    @Query(() => [User])
    async invitees(
        @Arg('teamId', () => Int) teamId: number,
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const result = [] as any[];

        const friends = await getConnection().query(
            `
                select u.* from "user" as u inner join friend as f 
                on u.id = f."senderId" or u.id = f."receiverId"
                where (f."senderId" = $1 or f."receiverId" = $1) 
                and u.id != $1 and f.status = true
            `, [req.session.uid]
        );

        for(let i=0;i<friends.length;i++) {
            const user = friends[i];

            const member = await Member.findOne({ where: { 
                userId: user.id,
                teamId
            }});

            if(!member) result.push(user);
        }

        return result;
    }

    @Query(() => [User])
    async members(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<User[]> {
        const users = await getConnection().query(
            `
                select u.* from "user" as u
                inner join member as m on u.id = m."userId"
                where m."teamId" = $1
            `, [teamId]
        );

        return users;
    }

    @Mutation(() => Boolean)
    async addMember(
        @Arg('userId', () => Int) userId: number,
        @Arg('teamId', () => Int) teamId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const team = await Team.findOne(teamId);

        if(team?.ownerId !== req.session.uid) {
            return false;
        }

        await getConnection().query(
            `
                insert into member ("userId", "teamId")
                values ($1, $2)
            `, 
            [userId, teamId]
        );

        return true;
    }

    @Query(() => Team)
    async team(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Team | undefined> {
        return Team.findOne(teamId);
    }

    @Query(() => [Team])
    async teams(
        @Ctx() { req } : MyContext
    ) : Promise<[Team]> {
        const teams = await getConnection().query(
            `
                select * from team as t
                inner join member on t.id = member."teamId"
                where member."userId" = $1 order by 
                t."createdAt" DESC
            `, [req.session.uid]
        );

        return teams;
    }

    @Mutation(() => Boolean)
    async createTeam(
        @Arg('teamName') teamName: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().transaction(async (tm) => {
            const result = await tm.createQueryBuilder()
                                  .insert()
                                  .into(Team)
                                  .values({ 
                                      name: teamName,
                                      ownerId: uid
                                   })
                                  .returning('*')
                                  .execute();

            const teamId = result.raw[0].id;

            await tm.query(
                `
                  insert into member ("teamId", "userId")
                  values ($1, $2)
                `, [teamId, uid]
            );

            await tm.query(
                `
                    insert into channel (name, "teamId", "isOriginal")
                    values  ($1, $2, $3)
                `, 
                ["general", teamId, true]
            );
        });

        return true;
    }
}