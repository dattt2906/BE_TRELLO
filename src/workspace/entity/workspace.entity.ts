import { Board } from "src/board/entity/board.entity";
import { ColumnEntity } from "src/table/column.entity";
import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    workspaceId: number
    @Column()
   workspacename: string;
    @OneToMany(()=>Board,(board)=>board.workspace)
    boards:Board[]
    @ManyToOne(()=>User, (user)=> user.workspaces)
    @JoinColumn({name:"userId"})
    user:User
}
