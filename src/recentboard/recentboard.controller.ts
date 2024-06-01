import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecentboardService } from './recentboard.service';
import { RecentBoardDto } from './dto/recentboard.dto';
import { RecentBoard } from './entity/recentboard.entity';
import { retry } from 'rxjs';

@Controller('recentboard')
export class RecentboardController {
  constructor(private readonly recentboardService: RecentboardService) {}

  @Post("create-recent-board")
  async createRecentBoard(@Body() recentBoard:RecentBoardDto):Promise<RecentBoard>{
    return await this.recentboardService.createRecentBoard(recentBoard)
  }
  // @Get("find-recentboards-by-userId/:userId")
  // async findRecentBoardsByUserId(@Param("userId") userId:number):Promise<RecentBoard[]>{

  //   return await this.recentboardService.findRecentBoardsByUserId(userId)
  // }
}
