import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER_TRANSPORTER_KEY } from '../common/constants/provider';
import { Transporter } from 'nodemailer';
import { CONFIG_SMTP_FROM_KEY } from '../common/constants/env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(PROVIDER_TRANSPORTER_KEY) private readonly transporter: Transporter,
  ) {}

  async sendMail(recipient: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow(CONFIG_SMTP_FROM_KEY),
      to: recipient,
      subject,
      text,
    });
  }
}
