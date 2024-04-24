import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
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

    @OneToMany(()=>Workspace,(workspace)=>workspace.user)
    workspaces:Workspace[]

    @OneToOne(()=>UserInfor, (uInfor)=>uInfor.users)

    userInfors:UserInfor

}