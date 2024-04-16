import { Injectable, Redirect, UnauthorizedException, flatten } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { from } from 'rxjs';
import { SendEmailDto } from 'src/mailer/mail.interface';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private mailerService: MailerService,
        private jwtService: JwtService) {
    }

    async setIsActive(userId: number) {
        await this.usersService.updateUserActive(userId)

    }




    async signIn(username: string, password: string): Promise<{ access_token: string, id: number,Active:boolean|any }> {
        const user = await this.usersService.findUserByName(username);
        if (user?.password !== password) {
            throw new UnauthorizedException("Thong tin tai khoan hoac mat khau khong chinh xac");
        }
        else{

            if(user.isActive===false){
                throw new UnauthorizedException("Xac nhan trong mail truoc khi dang nhap");
            }

            const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: user.userId,
            Active:user.isActive
            

        };
        }

    }
    async Register(username: string, password: string): Promise<{ regis_token: string, id: number }> {

        const user = await this.usersService.findUserByName(username);
        if (user) {

            throw new UnauthorizedException("Ten tai khoan da co nguoi su dung");
        }
        const userNew = await this.usersService.createUser({ username, password })
        const payload = { sub: userNew.userId, username: userNew.username };
        const regis_token = await this.jwtService.signAsync(payload);
        const id = userNew.userId
        await this.mailerService.sendEmailLogin(regis_token, "dattt@rubicontechno.com")
        return {
            regis_token,
            id

        };


    }

    async confirm(token: string): Promise<any> {

        const jwt = require('jsonwebtoken');
        const tokenString = token; // Thay thế bằng token bạn muốn giải mã
        let decodeToken
        // Giải mã token
        await jwt.verify(token, jwtConstants.secret, (err, decoded) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Failed to decode token:', err);
            } else {
                // Thành công, trả về dữ liệu được giải mã
                console.log('Decoded payload:', decoded);
                decodeToken = [decoded]
            }
        });
        if (decodeToken) {
            const userId = decodeToken[0].sub
            // this.usersService.updateUserActive(decodeToken.sub)
            this.usersService.updateUserActive(userId)
           
        }

    }

    async forgetPass(username:string):Promise<any>{
        console.log(username)
        const user = await this.usersService.findUserByName(username);
        if (!user) {
            throw new UnauthorizedException("Email chua dang ki");
        }
        const payload = { sub: user.userId, username: user.username };
        const forgetPass_token = await this.jwtService.signAsync(payload);
        await this.mailerService.sendEmailForgotPass(forgetPass_token, "dattt@rubicontechno.com")
        return {
            forgetPass_token
        };
    }
    async decodeToken(token:string):Promise<any>{

        const jwt = require('jsonwebtoken');
        const tokenString = token; // Thay thế bằng token bạn muốn giải mã
      
        // Giải mã token
        await jwt.verify(token, jwtConstants.secret, (err, decoded) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Failed to decode token:', err);
            } else {
                // Thành công, trả về dữ liệu được giải mã
                console.log('Decoded payload:', decoded);
                
            }
        });
       
    }
    
}
