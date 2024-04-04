import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({nullable:true})
    display_name: string;

    @OneToMany(() => ColumnEntity, (col) => col.users)

    cols: ColumnEntity[];

}