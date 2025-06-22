import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PROVIDER_TRANSPORTER_KEY } from '../common/constants/provider';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import nodemailer = require('nodemailer');
import {
  CONFIG_SMTP_HOST_KEY,
  CONFIG_SMTP_PASS_KEY,
  CONFIG_SMTP_PORT_KEY,
  CONFIG_SMTP_SECURE_KEY,
  CONFIG_SMTP_USER_KEY,
} from '../common/constants/env';

@Module({
  imports: [ConfigModule],
  providers: [
    MailerService,
    {
      provide: PROVIDER_TRANSPORTER_KEY,
      useFactory: (configService: ConfigService) => {
        return nodemailer.createTransport({
          host: configService.getOrThrow(CONFIG_SMTP_HOST_KEY),
          port: configService.get(CONFIG_SMTP_PORT_KEY) ?? 587,
          secure: configService.getOrThrow(CONFIG_SMTP_SECURE_KEY),
          auth: {
            user: configService.getOrThrow(CONFIG_SMTP_USER_KEY),
            pass: configService.getOrThrow(CONFIG_SMTP_PASS_KEY),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailerService],
})
export class MailerModule {}
