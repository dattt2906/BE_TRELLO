import { Module } from '@nestjs/common';
import { NotiService } from './noti.service';
import { NotiController } from './noti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noti } from './entity/noti.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noti])],
  controllers: [NotiController],
  providers: [NotiService],
})
export class NotiModule {}
