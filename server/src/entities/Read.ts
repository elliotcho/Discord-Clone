import{
    BaseEntity,
    PrimaryColumn,
    Entity
} from "typeorm";

@Entity()
export class Read extends BaseEntity{
    @PrimaryColumn()
    messageId: number;

    @PrimaryColumn()
    userId: number;
}