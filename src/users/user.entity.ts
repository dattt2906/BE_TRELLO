import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { UserInfor } from "./userInfor.entity";
import { Workspace } from "src/workspace/entity/workspace.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({nullable:true})
    display_name: string;
    @Column({default:false})
    isActive:boolean;

    @ManyToMany(()=>Workspace,(workspace)=>workspace.users)
    @JoinTable()
    workspaces:Workspace[]

    @OneToOne(()=>UserInfor, (uInfor)=>uInfor.users)

    userInfors:UserInfor

}