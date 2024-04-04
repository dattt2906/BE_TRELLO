import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';




@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
