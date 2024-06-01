import { Module } from '@nestjs/common';
import { RecentboardService } from './recentboard.service';
import { RecentboardController } from './recentboard.controller';
import { UsersService } from 'src/users/users.service';
import { BoardService } from 'src/board/board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentBoard } from './entity/recentboard.entity';
import { User } from 'src/users/user.entity';
import { UserInfor } from 'src/users/userInfor.entity';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Module({
  imports :[TypeOrmModule.forFeature([RecentBoard,User,UserInfor,Board,Workspace])],
  controllers: [RecentboardController],
  providers: [RecentboardService,UsersService,BoardService,WorkspaceService],
})
export class RecentboardModule {}
