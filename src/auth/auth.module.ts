import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { UserInfor } from 'src/users/userInfor.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User,UserInfor]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn},
  }),UsersModule],
  controllers: [AuthController],
  providers: [AuthService,UsersService]
})
export class AuthModule {}
