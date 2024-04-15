import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { from } from 'rxjs';
import { SendEmailDto } from 'src/mailer/mail.interface';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private mailerService:MailerService,
        private jwtService: JwtService) {
    }

    async setIsActive(userId:number){
        await this.usersService.updateUserActive(userId)

    }




    async signIn(username: string, password: string): Promise<{ access_token: string,id:number }> {
        const user = await this.usersService.findUserByName(username);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: user.userId

        };


    }
    async Register(username:string, password:string):Promise<{regis_token:string, id:number}>{

        const user = await this.usersService.findUserByName(username);
        if(user){

            throw new UnauthorizedException();
        }
       const userNew= await this.usersService.createUser({username, password})
        const payload = { sub: userNew.userId, username: userNew.username };
        const regis_token= await this.jwtService.signAsync(payload);
        const id=userNew.userId
        console.log(regis_token)

        const dto:SendEmailDto={
            from:{name:'', address:"kid2962002@gmail.com" } ,
            recipients:[{name:'', address:'dattt@rubicontechno.com'}],
            subject:"verify-trello",
            html:`<a href="http://localhost:3000/${regis_token}"><button style="background-color: #4CAF50" onclick="setIsActive(${id})">click here to login trello</button> </a><p>Cherr!</p>`
          }

        await this.mailerService.sendEmail(dto)
        return {
            regis_token,
            id

        };

        
    }
   
  



}
