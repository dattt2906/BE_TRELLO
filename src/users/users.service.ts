import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersDto } from './dto/users.dto';
import { asyncScheduler } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorate/auth.guard';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        
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
        return this.usersRepository.save(user);
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

    
    async findUserByName(userNameInput:string): Promise<User> {
       const user= await this.usersRepository.findOneBy({
            username: userNameInput
        })
        console.log(user)
        return user;
    }


    
}


