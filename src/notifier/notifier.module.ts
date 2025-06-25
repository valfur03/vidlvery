import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { MailerModule } from '../mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
