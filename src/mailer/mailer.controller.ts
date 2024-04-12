import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mail.interface';


@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post("/send-email")
  async sendMail(){

    const dto:SendEmailDto={
      from:{name:'', address:"kid2962002@gmail.com" } ,
      recipients:[{name:'', address:'dattt@rubicontechno.com'}],
      subject:"test-mail",
      html:'<a href="https://trello.com/b/ITobUWSE/boardasads"> click here to login trello </a><p>Cherr!</p>'
    }
    return await this.mailerService.sendEmail(dto);
  }
}
