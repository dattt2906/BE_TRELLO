import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { FilesService } from './files.service';
import { TableService } from 'src/table/table.service';
import { ColumnEntity } from 'src/table/column.entity';
import { RowEntity } from 'src/table/row.entity';
import { RowDetail } from 'src/table/rowDetails.entity';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { User } from 'src/users/user.entity';
import { UserInfor } from 'src/users/userInfor.entity';
import { BoardService } from 'src/board/board.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports :[TypeOrmModule.forFeature([File,ColumnEntity, RowEntity,RowDetail,Board,Workspace,User,UserInfor])],
  controllers: [FilesController],
  providers:[FilesService, TableService,BoardService, WorkspaceService, UsersService]
})
export class FilesModule {}
