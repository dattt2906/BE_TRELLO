import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entity/workspace.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserInfor } from 'src/users/userInfor.entity';
import { Board } from 'src/board/entity/board.entity';
import { BoardService } from 'src/board/board.service';

@Module({
  imports:[TypeOrmModule.forFeature([Workspace,User,UserInfor])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService,UsersService],
})
export class WorkspaceModule {}
