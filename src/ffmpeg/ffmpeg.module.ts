import { Module } from '@nestjs/common';
import { FfmpegService } from './ffmpeg.service';
import { ConfigModule } from '@nestjs/config';
import { FsModule } from '../fs/fs.module';

@Module({
  imports: [ConfigModule, FsModule],
  providers: [FfmpegService],
  exports: [FfmpegService],
})
export class FfmpegModule {}
