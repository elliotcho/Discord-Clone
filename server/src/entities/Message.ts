import { Field, ObjectType } from "type-graphql";
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
    channelId: number;

    @Field()
    isRead: boolean;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}