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

@ObjectType()
@Entity()
export class VoiceChannel extends BaseEntity {
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
    @Column()
    teamId: number;

    @ManyToOne(() => Team, (team) => team.voiceChannels, {
        onDelete: 'CASCADE'
    })
    team: Team;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}