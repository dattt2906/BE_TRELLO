import { Module } from '@nestjs/common';
import { RecentboardService } from './recentboard.service';
import { RecentboardController } from './recentboard.controller';

@Module({
  controllers: [RecentboardController],
  providers: [RecentboardService],
})
export class RecentboardModule {}
