import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { MailerModule } from '../mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [ConfigModule, MailerModule, TemplatesModule],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
