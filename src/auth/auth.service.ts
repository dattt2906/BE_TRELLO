import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) {
    }
    async signIn(username: string, password: string): Promise<{ access_token: string,id:number }> {
        const user = await this.usersService.findUserByName(username);
        console.log("User:",user)
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: user.userId

        };


    }
  



}
