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
import { Team } from '../entities/Team';

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

    @Field()
    @Column({default: false})
    read: boolean;
}