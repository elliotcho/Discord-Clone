import { Field, ObjectType } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Team } from './Team';
import { Message } from './Message';

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
    teamId: number;

    @Field()
    lastMessage: Message;

    @ManyToOne(() => Team, (team) => team.channels, {
        onDelete: 'CASCADE'
    })
    team: Team;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}