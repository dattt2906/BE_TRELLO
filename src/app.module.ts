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


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'nestjs',
    entities: [User, ColumnEntity, RowEntity,UserInfor],
    synchronize: true,
  }), UsersModule, TableModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
