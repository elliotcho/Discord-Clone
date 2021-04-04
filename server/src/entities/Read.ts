import{
    BaseEntity,
    PrimaryColumn,
    Entity
} from "typeorm";

@Entity()
export class Read extends BaseEntity{
    @PrimaryColumn()
    channelId: number;

    @PrimaryColumn()
    userId: number;
}