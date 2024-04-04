import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { RowEntity } from "./row.entity";
import { User } from "src/users/user.entity";


@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    columnId: number;
    @Column()
    columnName: string;
    @Column()
    sort:number;

    @CreateDateColumn()
    createdAt!: Date;
    @OneToMany(() => RowEntity, (row) => row.cols)

    rows: RowEntity[];

    @ManyToOne(() => User, (user) => user.cols)
    @JoinColumn({ name: "userId" })
    users: User;



}
