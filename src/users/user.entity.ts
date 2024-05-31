import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { UserInfor } from "./userInfor.entity";
import { Workspace } from "src/workspace/entity/workspace.entity";
import { Comment } from "src/comment/entity/comment.entity";
import { Noti } from "src/noti/entity/noti.entity";
import { RecentBoard } from "src/recentboard/entity/recentboard.entity";
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

    @OneToMany(()=>Comment, (comment)=>comment.user)
    comments:Comment[]
    @OneToMany(()=>Noti, (noti)=>noti.user)
    noties:Noti[]

    @OneToMany(()=>RecentBoard, (recentboard)=>recentboard.user)
    recentBoards:RecentBoard[]

}