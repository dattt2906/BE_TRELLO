import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
    constructor (private readonly configService:ConfigService){

    }
    mailTransport(){
      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>("MAIL_HOST"),
        port: this.configService.get<number>("MAIL_PORT"),
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:this.configService.get<string>("MAIL_USER"),
          pass: this.configService.get<string>("MAIL_PASSWORD"),
        },
      });
      return transporter
    }
  
    async sendEmail(dto:SendEmailDto){
        const {from, recipients , subject, html, placeholderReplacements}= dto;
        const transport= this.mailTransport();
  
        const options:Mail.Options={
          from:from ?? { 
          name:this.configService.get<string>("APP_NAME"),
          address: this.configService.get<string>("DEFAULT_MAIL_FROM"),
          },
          to:recipients,
          subject,
          html
        }
        try{
          const result=await transport.sendMail(options);
          return result;
        } catch(error){
          console.log('Error:', error)
        }
        
    }



}
