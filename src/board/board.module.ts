import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { UserInfor } from 'src/users/userInfor.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Board,Workspace,User,UserInfor])],
  controllers: [BoardController],
  providers: [BoardService,WorkspaceService,UsersService],
})
export class BoardModule {}
