import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Body } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/decorate/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) { }
  @Get('find-all-user')
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get("find-user-by-id/:userId")
  async getUserById(@Param("userId") userId: number): Promise<User> {
    return await this.userService.findUserById(userId);
  }

  @Post('create-user')
  async createUser(@Body() user: UsersDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Get('find-user-by-name/:username')
  async findUserByName(@Param('username') username:string):Promise<User>{
    const user= await this.userService.findUserByName(username);
    if(!user){
      console.log("user khong ton tai")
    }
    console.log(user);
    return user;


  }
  
}


