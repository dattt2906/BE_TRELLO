
import { Board } from "src/board/entity/board.entity";
import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class RecentBoard {
    @PrimaryGeneratedColumn()
    recentBoardId:number
    @Column()
    recentBoardName:string
    @Column()
    recentBoardBackGround:string
    @Column()
    workspaceName:string
    @ManyToOne(()=>User, (user)=>user.recentBoards)
    @JoinColumn({name:"userId"})
    user:User

    @OneToOne(()=>Board, (board)=> board.recentBoard)
    @JoinColumn({name:"boardId"})
    board:Board
}
