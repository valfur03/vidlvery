import { Module } from '@nestjs/common';
import { EncoderService } from './encoder.service';
import { FfmpegModule } from '../ffmpeg/ffmpeg.module';

@Module({
  imports: [FfmpegModule],
  providers: [EncoderService],
  exports: [EncoderService],
})
export class EncoderModule {}
