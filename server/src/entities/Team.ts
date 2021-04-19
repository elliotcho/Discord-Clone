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
import { Channel } from '../entities/Channel';

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

    @OneToMany(() => Channel, (channel) => channel.team)
    channels: Channel[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}