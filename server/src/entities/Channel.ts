import { Field, ObjectType } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Message } from './Message';
import { Team } from './Team';

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    isOriginal: boolean;

    @Field()
    @Column({ default: false })
    isPrivate: boolean;

    @Field()
    isMember: boolean;

    @Field()
    @Column()
    teamId: number;

    @ManyToOne(() => Team, (team) => team.channels, {
        onDelete: 'CASCADE'
    })
    team: Team;

    @OneToMany(() => Message, (message) => message.channel)
    messages: Message[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}