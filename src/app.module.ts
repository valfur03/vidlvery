import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { MailerModule } from './mailer/mailer.module';
import { VideosModule } from './videos/videos.module';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';
import { FsModule } from './fs/fs.module';
import { EncoderModule } from './encoder/encoder.module';
import { NotifierModule } from './notifier/notifier.module';
import { TemplatesModule } from './templates/templates.module';
import baseConfiguration from './common/config/base';
import smtpConfiguration from './common/config/smtp';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfiguration, smtpConfiguration],
    }),
    JobsModule,
    MailerModule,
    VideosModule,
    FfmpegModule,
    FsModule,
    EncoderModule,
    NotifierModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
