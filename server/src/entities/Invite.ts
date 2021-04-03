import{
    BaseEntity,
    CreateDateColumn,
    Entity,
    PrimaryColumn
} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';

@ObjectType()
@Entity()
export class Invite extends BaseEntity{
    @Field()
    @PrimaryColumn()
    senderID: number;

    @Field()
    @PrimaryColumn()
    receiverID: number;

    @Field()
    @PrimaryColumn()
    teamID: number

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}

