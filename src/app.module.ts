import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TableModule } from './table/table.module';
import { ColumnEntity } from './table/column.entity';
import { RowEntity } from './table/row.entity';
import { AuthModule } from './auth/auth.module';
import { UserInfor } from './users/userInfor.entity';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from './workspace/workspace.module';
import { BoardModule } from './board/board.module';
import { Workspace } from './workspace/entity/workspace.entity';
import { Board } from './board/entity/board.entity';
import { RowDetail } from './table/rowDetails.entity';
import { EventModule } from './event/event.module';
import { Comment } from './comment/entity/comment.entity';
import { CommentModule } from './comment/comment.module';
import { TodolistModule } from './todolist/todolist.module';
import { TodoList } from './todolist/entity/todoList.entity';
import { Todo } from './todolist/entity/todo.entity';
import { NotiModule } from './noti/noti.module';
import { Noti } from './noti/entity/noti.entity';
import { RecentboardModule } from './recentboard/recentboard.module';
import { RecentBoard } from './recentboard/entity/recentboard.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/decorate/auth.guard';




@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'nestjs',
    entities: [User, ColumnEntity, RowEntity,UserInfor,Workspace,Board, RowDetail, Comment,TodoList,Todo,Noti,RecentBoard],
    synchronize: true,
  }), UsersModule, TableModule, AuthModule, MailerModule, WorkspaceModule, BoardModule,EventModule, CommentModule, TodolistModule, NotiModule, RecentboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
