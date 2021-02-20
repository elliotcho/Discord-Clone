import { 
    BaseEntity, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn, 
    UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Member extends BaseEntity {
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    teamId: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}