import { Field, ObjectType } from "type-graphql";
import{
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Channel } from './Channel';
import { Read } from './Read';

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

    @ManyToOne(() => Channel, (channel) => channel.messages, {
        onDelete: 'CASCADE'
    })
    channel: Channel;

    @OneToMany(() => Read, (read) => read.message)
    readReceipts: Read[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}