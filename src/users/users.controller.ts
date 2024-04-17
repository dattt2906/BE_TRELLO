import { BadGatewayException, BadRequestException, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Body } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/decorate/auth.guard';
import { UserInfor } from './userInfor.entity';
import { UsersInfotDto } from './dto/userInfor.dto';

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
  // @Put("update-user-password/:userId")
  // async updateUser(@Param("userId") userId:number, @Body("password") password:string):Promise<any>{

  //   return await this.userService.updateUser(userId, password)
  // }

  @Put('update-user-active/:userId')
  async updateUserActive(@Param('userId') userId:number):Promise<User>{
    return await this.userService.updateUserActive(userId)
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
  @Get('find-all-userinfor')
  async findUserInfor():Promise<UserInfor[]>{

    return await this.userService.findAllUserInfor();
  }
  @Post('create-userinfor')
  async createUserInfor(@Body() userInfor:UsersInfotDto):Promise<UserInfor>{
    return await this.userService.createUserInfor(userInfor);
  }

  @Get('find-userinfor-by-userId/:userId')
  async findUserInforById(@Param('userId') userId:number):Promise<UserInfor>{
  return await this.userService.findUserInforById(userId)
    }
  
  @Put('update-display_name/:userId')
  async updateDisplayName(@Param('userId') userId:number, @Body('display_name') display_Name: string):Promise<UserInfor>{
    return await this.userService.updateDisplayName(userId,display_Name);
  }
  @Put('update-age/:userId')
  async updateAge(@Param('userId') userId:number, @Body('age') age: number):Promise<UserInfor>{
    return await this.userService.updateAge(userId,age);
  }
  @Put('update-sex/:userId')
  async updateSex(@Param("userId") userId:number,@Body('sex') sex:string):Promise<UserInfor>{

    return await this.userService.updateSex(userId, sex);
  }
  @Put('update-address/:userId')
  
  async updateAddress(@Param("userId") userId:number,@Body('address') address:string):Promise<UserInfor>{

    return await this.userService.updateAddress(userId, address);
  }
  
  
}
  


