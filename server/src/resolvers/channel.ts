import { 
    Resolver,
    Query, 
    Arg,
    Int,
    Mutation,
    Ctx,
    FieldResolver,
    Root
} from "type-graphql";
import { getConnection } from "typeorm";
import { Message } from '../entities/Message';
import { Channel } from "../entities/Channel";
import { ChannelMember } from '../entities/ChannelMember';
import { Team } from '../entities/Team';
import { Read } from '../entities/Read';
import { User } from '../entities/User';
import { MyContext } from "../types";

@Resolver(Channel)
export class ChannelResolver {
    @FieldResolver(() => Boolean)
    async isMember(
        @Root() { id: channelId, isPrivate } : Channel,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        if(!isPrivate) {
            return true;
        }

        const isMember = await ChannelMember.findOne({ where: { 
            userId: req.session.uid,
            channelId
        }});

        return !!isMember;
    }

    @FieldResolver(() => Boolean) 
    async isRead(
        @Root() { id: channelId } : Channel,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const messages = await Message.find({ where: { channelId } });

        for(let i=0;i<messages.length;i++) {
            const isRead = await Read.findOne({ where: {
                messageId: messages[i].id,
                userId: req.session.uid
            }});

            if(!isRead) return false;
        }

        return true;
    }

    @FieldResolver(() => Boolean)
    async isOwner(
        @Root() { teamId } : Channel,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const team = await Team.findOne(teamId);
        const ownerId = team?.ownerId;

        return req.session.uid === ownerId;
    }
    
    @Mutation(() => Boolean)
    async togglePrivacy(
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const channel = await Channel.findOne(channelId);
        const isPrivate = !!channel?.isPrivate;

        if(!isPrivate) { //becoming private
            await this.addChannelMember(channelId, req.session.uid!);
        } 
        
        else { //becoming public
            await getConnection().query(
                `
                    delete from channel_member as c
                    where c."channelId" = $1
                `, 
                [channelId]
            );
        }

        await Channel.update({ id: channelId }, { isPrivate: !isPrivate });

        return true;
    }

    @Mutation(() => Boolean)
    async editChannelName(
        @Arg('teamId', () => Int) teamId: number,
        @Arg('channelId', () => Int) channelId: number,
        @Arg('newName') newName: string
    ) : Promise<boolean> {
        const channels = await Channel.find({ teamId, name: newName });

        if(!!channels.length) {
            return false;
        }

        await Channel.update({ id: channelId }, { name: newName });
        return true;
    }

    @Query(() => [Channel])
    async channels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        return Channel.find({ teamId });
    }

    @Mutation(() => Boolean)
    async createChannel(
        @Arg('channelName') channelName: string,
        @Arg('teamId', () => Int) teamId: number
    ): Promise<Boolean> {
        await getConnection().query(
            `
                insert into channel (name, "teamId", "isOriginal")
                values ($1, $2, $3)
            `,
            [channelName, teamId, false] 
        );
        
        return true;
    }

    @Mutation(() => Boolean)
    async deleteChannel(
        @Arg('channelId', () => Int) channelId: number
    ) : Promise<Boolean> {
        await getConnection().query(
            `
                delete from channel where
                channel.id = $1 
            `,
            [channelId]
        )

        return true;
    }

    @Query(() => Channel)
    async channel(
        @Arg('channelId', () => Int) channelId: number
    ) : Promise<Channel | undefined> {
        return Channel.findOne(channelId)
    }

    @Mutation(() => Boolean)
    async addChannelMember(
        @Arg('channelId', () => Int) channelId: number,
        @Arg('userId', () =>Int) userId: number,
    ): Promise<boolean> {
        await getConnection().query(
            `
                insert into channel_member ("userId", "channelId")
                values ($1, $2)
            `,
            [userId, channelId]
        );
        
        return true;
    }
}