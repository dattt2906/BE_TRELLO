import { Controller,Body,Post, Get} from '@nestjs/common';
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
   


}
