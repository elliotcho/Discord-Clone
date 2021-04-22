import {
    PrimaryColumn,
    CreateDateColumn,
    Entity,
    BaseEntity,
    ManyToOne
} from 'typeorm';
import { Team } from './Team';

@Entity()
export class Seen extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    teamId: number;

    @ManyToOne(() => Team, (team) => team.seenBy, {
        onDelete: 'CASCADE'
    })
    team: Team;

    @CreateDateColumn()
    createdAt: Date;
}