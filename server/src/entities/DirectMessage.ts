import {Field, ObjectType} from "type-graphql";
import{
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class DirectMessage extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    text: string;

    @Field()
    @Column()
    senderId: number;

    @Field()
    @Column()
    receiverId: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}