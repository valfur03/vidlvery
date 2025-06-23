import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
