import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { RowEntity } from './row.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/decorate/auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, RowEntity, User])],
  controllers: [TableController],
  providers: [TableService, UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ]
})
export class TableModule { }
