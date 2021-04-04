import {Field, ObjectType} from "type-graphql";
import{
    BaseEntity,
    Column,
    Entity
} from "typeorm";


@ObjectType()
@Entity()
export class Read extends BaseEntity{
    @Field()
    @Column()
    channelId: number

    @Field()
    @Column()
    userId: number
}