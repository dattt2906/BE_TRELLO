import { Controller,Body,Post, Get, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDto } from './dto/account.dto';
import { Public } from './decorate/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // @Public()
    @Post('login')
    async signIn(@Body() account:AccountDto ) {
        return this.authService.signIn(account.username, account.password);
      }
    @Post('regis')
    async regis(@Body(ValidationPipe) account:AccountDto){
      return this.authService.Register(account.username,account.password);
      
    }
   


}
