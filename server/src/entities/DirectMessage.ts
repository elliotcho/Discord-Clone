import {Field, ObjectType} from "type-graphql";
import{
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class DirectMessage extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    text: string;

    @Field()
    @Column({ default: '' })
    pic: string;

    @Field()
    @Column()
    senderId: number;

    @Field()
    @Column()
    receiverId: number;

    @Field()
    @Column({ default: false })
    isRead: boolean;

    @Field(() => User)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}