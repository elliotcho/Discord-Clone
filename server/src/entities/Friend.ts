import { Field } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Friend extends BaseEntity {
    @Field()
    @PrimaryColumn()
    receiverId: number;

    @Field()
    @PrimaryColumn()
    senderId: number;

    @Field()
    @Column({ default: false })
    status: boolean;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}