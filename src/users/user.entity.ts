import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { UserInfor } from "./userInfor.entity";
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
    @Column({default:false})
    isActive:boolean;

    @OneToMany(() => ColumnEntity, (col) => col.users)
    cols: ColumnEntity[];

    @OneToOne(()=>UserInfor, (uInfor)=>uInfor.users)

    userInfors:UserInfor

}