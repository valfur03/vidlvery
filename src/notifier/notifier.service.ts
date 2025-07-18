import { Injectable } from '@nestjs/common';
import { CONFIG_VIDEOS_BASE_URL_KEY } from '../common/constants/env';
import { CompletedJob } from '../jobs/job.type';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class NotifierService {
  private readonly notificationJobDoneSubject = 'Job done';

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly templatesService: TemplatesService,
  ) {}

  async notifyByEmail(file: CompletedJob['file'], email: string) {
    await this.mailerService.sendMail(
      email,
      this.notificationJobDoneSubject,
      this.templatesService.getJobDoneText({
        videoUrl: `${this.configService.getOrThrow(CONFIG_VIDEOS_BASE_URL_KEY)}/${file.id}/${file.name}`,
      }),
    );
  }

  async notify(job: CompletedJob) {
    return this.notifyByEmail(job.file, job.initiator.email);
  }
}
