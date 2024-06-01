import { Injectable, NotFoundException } from '@nestjs/common';
import { RecentBoard } from './entity/recentboard.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecentBoardDto } from './dto/recentboard.dto';
import { UsersService } from 'src/users/users.service';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class RecentboardService {
    constructor(
        @InjectRepository(RecentBoard)
        private recnetboardRepository:Repository<RecentBoard>,

        private userService:UsersService,
        private boardService:BoardService
       
    
        ){}


        async createRecentBoard(recentBoard:RecentBoardDto):Promise<RecentBoard>{
            const user= await this.userService.findUserById(recentBoard.userId)
            if(!user){

                throw new NotFoundException("user does not find");
            }
            const board= await this.boardService.findBoardById(recentBoard.boardId)
            if(!board){

                throw new NotFoundException("board does not find");
            }
            const newRecentboard= new RecentBoard()
            newRecentboard.user= user
            newRecentboard.board= board
            newRecentboard.recentBoardName=board.boardname
            newRecentboard.recentBoardBackGround=board.boardbackground
            newRecentboard.workspaceName= board.workspace.workspacename
            return await this.recnetboardRepository.save(newRecentboard)



        }
     




}
