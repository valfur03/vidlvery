import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { MailerModule } from './mailer/mailer.module';
import baseConfiguration from './common/config/base';
import smtpConfiguration from './common/config/smtp';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfiguration, smtpConfiguration],
    }),
    JobsModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
