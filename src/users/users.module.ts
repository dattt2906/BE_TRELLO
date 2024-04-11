import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserInfor } from './userInfor.entity';




@Module({
  imports: [TypeOrmModule.forFeature([User,UserInfor])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
