import { MyContext } from "src/types";
import{
    Arg,
    Ctx,
    Mutation,
    Resolver,
    Int
} from "type-graphql";
import {getConnection} from "typeorm";
import {Invite} from "../entities/Invite";

@Resolver(Invite)
export class InviteResolver{
    @Mutation(() => Invite)
    async invite(
        @Arg('teamId', ()=> Int) teamId: number,
        @Arg('receiverId', ()=> Int) receiverId: number,
        @Ctx() {req}: MyContext
    ): Promise<Invite | undefined>{
        return await getConnection().query(
            `
            INSERT INTO INVITE (senderId, receiverId, teamId)
            VALUES($1, $2, $3) 
            `,[req.session.uid, receiverId, teamId]
        );
    }
}