import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { FsModule } from '../fs/fs.module';
import { EncoderModule } from '../encoder/encoder.module';
import { NotifierModule } from '../notifier/notifier.module';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [EncoderModule, VideosModule, FsModule, NotifierModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
