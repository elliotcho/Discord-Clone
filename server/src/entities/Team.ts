import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from 'type-graphql';
import { Channel } from './Channel';
import { Seen } from './Seen';

@ObjectType()
@Entity()
export class Team extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    ownerId: number;

    @Field()
    @Column({ default: '' })
    photo: string;

    @Field()
    unreadMessages: number;

    @OneToMany(() => Channel, (channel) => channel.team)
    channels: Channel[];

    @OneToMany(() => Seen, (seen) => seen.team)
    seenBy: Seen;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}