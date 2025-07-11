import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';
import { FsModule } from '../fs/fs.module';

@Module({
  imports: [ConfigModule, FsModule],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
