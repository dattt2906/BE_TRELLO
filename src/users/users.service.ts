import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersDto } from './dto/users.dto';
import { asyncScheduler } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorate/auth.guard';
import { UserInfor } from './userInfor.entity';
import { privateDecrypt } from 'crypto';
import { UsersInfotDto } from './dto/userInfor.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserInfor)
        private userInforRepository: Repository<UserInfor>,
        
    ) {
    }
    findAll(): Promise<User[]> {
        return this.usersRepository.find({

            relations: {

                cols: {
                    rows: true

                }
            }

        });
    }
    async createUser(user: UsersDto): Promise<User> {
        
        const { username, password} = user
        const userCreate= await this.usersRepository.save({username,password});
        
        return userCreate;
    }
    async findUserById(userId: number): Promise<User> {
        return await this.usersRepository.findOne({
            where: { userId: userId },
            relations:
            {

                cols: {
                    rows: true

                }
            }
        })
    }
    async updateUser(userId:number, password:string):Promise<any>{
        const user= await this.findUserById(userId)
        if(!user){
            throw new NotFoundException("user does not find");
        }
        user.password = password
        return await this.usersRepository.save(user)
    }

    
    async findUserByName(userNameInput:string): Promise<User> {
       const user= await this.usersRepository.findOneBy({
            username: userNameInput
        })
        console.log(user)
        return user;
    }

    async findAllUserInfor():Promise<UserInfor[]>{

        return await this.userInforRepository.find({

            relations:{
                users:true
            }
        }
            
               
        );
    }
    async createUserInfor(userInfo:UsersInfotDto):Promise<UserInfor>{
        const user= await this.findUserById(userInfo.userId)
        const newUserInfor = new UserInfor();
        newUserInfor.display_name=userInfo.display_name;
        newUserInfor.age= userInfo.age;
        newUserInfor.sex=userInfo.sex;
        newUserInfor.address=userInfo.address;
        newUserInfor.users=user;
        return await this.userInforRepository.save(newUserInfor)
        
    }

    async findUserInforById(userId:number):Promise<UserInfor>{

        return await this.userInforRepository.findOne({
                where:{users:{userId:userId},
        }  
            })
    }
    async updateDisplayName(userId:number,display_name:string):Promise<UserInfor>{

        const userInfor= await this.findUserInforById(userId);
        if(!userInfor){
            throw new NotFoundException("user does not find");
        }
        await this.userInforRepository.update(userInfor, { display_name: display_name });
        return await this.findUserInforById(userId)
    }
    async updateAge(userId:number,age:number):Promise<UserInfor>{

        const userInfor= await this.findUserInforById(userId);
        if(!userInfor){
            throw new NotFoundException("user does not find");
        }
        await this.userInforRepository.update(userInfor, { age: age });
        return await this.findUserInforById(userId)
    }

    async updateSex(userId:number, sex:string):Promise<UserInfor>{
        const userInfor= await this.findUserInforById(userId);
        
        if(!userInfor){
            throw new NotFoundException("user does not find");
        }
        await this.userInforRepository.update(userInfor, { sex: sex });
        return await this.findUserInforById(userId)

    }
    async updateAddress(userId:number, address:string):Promise<UserInfor>{
        console.log(address)
        const userInfor= await this.findUserInforById(userId);
        console.log(userInfor)
        if(!userInfor){
            throw new NotFoundException("user does not find");
        }
        userInfor.address=address
        await this.userInforRepository.save(userInfor)
        return await this.findUserInforById(userId)

    }

    async updateUserActive(userId:number):Promise<User>{
        const user= await this.findUserById(userId);
        if(!user){
            throw new NotFoundException("user does not find");
        }
        // await this.usersRepository.update(userId, { isActive: true });

    user.isActive = true; // Cập nhật trạng thái isActive trong đối tượng user

    return await this.usersRepository.save(user)

    }


    


    
}


