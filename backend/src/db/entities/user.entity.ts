import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from "typeorm";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column()
    password: string

    @Column({ nullable: true, default: "normal" })
    type: string

}