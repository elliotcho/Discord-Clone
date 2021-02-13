import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    email!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}