import {Field, ObjectType} from "type-graphql";
import{
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Message extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    message: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    edited: Date;

    @Field()
    @Column()
    senderID: number;

    @Field()
    @Column()
    channelID: number;
}