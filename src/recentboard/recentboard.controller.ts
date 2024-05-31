import { Body, Controller, Post } from '@nestjs/common';
import { RecentboardService } from './recentboard.service';
import { RecentBoardDto } from './dto/recentboard.dto';
import { RecentBoard } from './entity/recentboard.entity';

@Controller('recentboard')
export class RecentboardController {
  constructor(private readonly recentboardService: RecentboardService) {}

  // @Post("create-recent-board")
  // async createRecentBoard(@Body() recentBoard:RecentBoardDto):Promise<RecentBoard>{
  //   return await this.recentboardService.createRecentBoard(recentBoard.userId, recentBoard.boardId)
  // }
}
