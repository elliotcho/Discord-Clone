import{
    BaseEntity,
    PrimaryColumn,
    Column,
    Entity
} from "typeorm";

@Entity()
export class Read extends BaseEntity{
    @PrimaryColumn()
    messageId: number;

    @PrimaryColumn()
    userId: number;

    @Column({ nullable: true })
    isDM: boolean;
}