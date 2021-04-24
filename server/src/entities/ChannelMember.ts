import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {Field, ObjectType} from 'type-graphql';

@ObjectType()
@Entity()
export class ChannelMember extends BaseEntity{
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    teamId: number;

    @Field()
    @PrimaryColumn()
    channelId: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
