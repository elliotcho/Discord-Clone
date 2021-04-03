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
import { Channel } from '../entities/Channel';
import { Team } from "../entities/Team";
import { MyContext } from "../types";

@Resolver(Team)
export class TeamResolver {
    @FieldResolver(() => [Channel])
    async channels(
        @Root() team: Team
    ) : Promise<Channel[]> {
        return Channel.find({ teamId: team.id });
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
                select * from team 
                inner join member on team.id = member."teamId"
                where member."userId" = $1 
                order by team."createdAt" DESC
            `, [req.session.uid]
        );

        return teams;
    }

    @Mutation(() => Boolean)
    async createTeam(
        @Arg('teamName') teamName: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        await getConnection().transaction(async (tm) => {
            const result = await tm.createQueryBuilder()
                                  .insert()
                                  .into(Team)
                                  .values({ name: teamName })
                                  .returning('*')
                                  .execute();

            const teamId = result.raw[0].id;

            await tm.query(
                `
                  insert into member ("userId", "teamId")
                  values ($1, $2)
                `, [req.session.uid, teamId]
            );

            await tm.query(
                `
                    insert into channel (name, "teamId")
                    values  ($1, $2)
                `, ["general", teamId]
            );
        });

        return true;
    }

    @Mutation(() => Team)
    async addUserToTeam(
        @Arg('teamId', () => Int) teamId: number,
        @Ctx() {req}: MyContext
    ): Promise<Team | undefined>{
       return await getConnection().query(
            `
            INSERT INTO MEMBER
            WHERE teamId = $1 AND userId= $2

            `,[teamId,req.session.uid]
        );
    }
}