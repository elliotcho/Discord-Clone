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
    @FieldResolver(() => Int)
    async numMembers(
        @Root() { id: channelId } : Channel
    ) : Promise<number> {
        const members = await this.channelMembers(channelId);
        const numMembers = members.length;

        return numMembers;
    }

    @FieldResolver(() => Int)
    async numMessages(
        @Root() { id: channelId } : Channel
    ) : Promise<number> {
        const messages = await getConnection().query(
            `
                select m.* from message as m
                where m."channelId" = $1
            `, [channelId]
        );

        return messages.length;
    }

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
    async removeChannelMember(
        @Arg('channelId', () => Int) channelId: number,
        @Arg('userId', () => Int) userId: number
    ) : Promise<boolean> {
        await getConnection().query(
            `
                delete from channel_member as c
                where c."channelId" = $1
                and c."userId" = $2
            `, [channelId, userId]
        );

        return true;
    }

    @Query(() => [User])
    async channelMembers(
        @Arg('channelId', () => Int) channelId: number
    ) : Promise<User[]> {
        let query = '';
        let replacements = [] as any;

        const channel = await Channel.findOne(channelId);
        const isPrivate = channel?.isPrivate;
        const teamId = channel?.teamId;

        if(isPrivate) {
            query = `
                select u.* from "user" as u
                inner join channel_member as c on c."userId" = u.id
                where c."channelId" = $1
            `;

            replacements = [channelId];
        } else {
            query = `
                select u.* from "user" as u
                inner join member as m on m."userId" = u.id
                where m."teamId" = $1
            `;

            replacements = [teamId];
        }

        const users = await getConnection().query(query, replacements);
        return users;
    }

    @Query(() => [User])
    async channelInvitees(
        @Arg('channelId', () => Int) channelId: number,
        @Ctx() { req } : MyContext
    ) : Promise<User[]>{
        const result = [] as any;

        const channel = await Channel.findOne(channelId);
        const teamId = channel?.teamId;

        const users = await getConnection().query(
            `
                select u.* from "user" as u
                inner join member as m on m."userId" = u.id
                where u.id != $1 and m."teamId" = $2
            `, [req.session.uid, teamId]
        );

        for(let i=0;i<users.length;i++) {
            const isChannelMember = await ChannelMember.findOne({ where: {
                 userId: users[i].id,
                 channelId
            }});    

            if(!isChannelMember) {
                result.push(users[i]);
            }
        }

        return result;
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
    async voiceChannels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        const voiceChannels = await getConnection().query(
            `
                select c.* from channel as c
                where c."teamId" = $1 nad c."isVoice" = true
                order by c."createdAt"
            `, [teamId]
        );

        return voiceChannels;
    }

    @Query(() => [Channel])
    async channels(
        @Arg('teamId', () => Int) teamId: number
    ) : Promise<Channel[]> {
        const channels = await getConnection().query(
            `
                select c.* from channel as c
                where c."teamId" = $1 and c."isVoice" = false
                order by c."createdAt"
            `, [teamId]
        );

        return channels;
    }

    @Mutation(() => Boolean)
    async createChannel(
        @Arg('channelName') channelName: string,
        @Arg('isVoice', { nullable: true }) isVoice: boolean,
        @Arg('teamId', () => Int) teamId: number
    ): Promise<Boolean> {
        await getConnection().query(
            `
                insert into channel (name, "teamId", "isVoice", "isOriginal")
                values ($1, $2, $3, $4)
            `,
            [channelName, teamId, !!isVoice, false] 
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