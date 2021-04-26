import { 
    Arg,
    Int,
    Query,
    Resolver 
} from "type-graphql";
import { getConnection } from "typeorm";
import { VoiceChannel } from "../entities/VoiceChannel";

@Resolver(VoiceChannel)
export class VoiceChannResolver {
    @Query(() => [VoiceChannel])
    async voiceChannels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<VoiceChannel[]> {
        const voiceChannels = await getConnection().query(
            `
                select v.* from voice_channel as v
                where v."teamId" = $1
                order by v."createdAt"
            `, [teamId]
        );

        return voiceChannels;
    }

}