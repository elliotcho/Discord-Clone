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
import { getConnection } from "typeorm";
import { Member } from "../entities/Member";
import { Channel } from '../entities/Channel';
import { Team } from "../entities/Team";
import { User } from '../entities/User';
import { MyContext } from "../types";

@Resolver(Team)
export class TeamResolver {
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