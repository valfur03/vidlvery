import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { watch, mkdirSync } from 'node:fs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import mv = require('mv');
import { ConfigService } from '@nestjs/config';
import {
  CONFIG_VIDEOS_BASE_URL_KEY,
  CONFIG_PUBLIC_DIRECTORY_PATH_KEY,
  CONFIG_WATCH_DIRECTORY_PATH_KEY,
} from './common/constants/env';
import { MailerService } from './mailer/mailer.service';
import { JobsService } from './jobs/jobs.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly watchDirectoryPath: string;
  private readonly publicDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;
  private readonly outputWatchDirectoryPath: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jobsService: JobsService,
    private readonly mailerService: MailerService,
  ) {
    this.watchDirectoryPath = this.configService.getOrThrow(CONFIG_WATCH_DIRECTORY_PATH_KEY);
    this.publicDirectoryPath = this.configService.getOrThrow(CONFIG_PUBLIC_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
    this.outputWatchDirectoryPath = `${this.watchDirectoryPath}/out`;
  }

  onApplicationBootstrap() {
    mkdirSync(this.inputWatchDirectoryPath, { recursive: true });
    mkdirSync(this.outputWatchDirectoryPath, { recursive: true });

    watch(this.outputWatchDirectoryPath, undefined, async (event, filename) => {
      switch (event) {
        case 'change': {
          if (filename === null) {
            return;
          }

          const newFilename = filename.replace(/^.+-id-/, '');

          mv(`${this.outputWatchDirectoryPath}/${filename}`, `${this.publicDirectoryPath}/${newFilename}`, (error) => {
            if (error) {
              throw error;
            }
          });

          const job = this.jobsService.popByFilename(filename);
          if (job !== undefined) {
            await this.mailerService.sendMail(
              job.initiator.emailAddress,
              'Job done',
              `The video is available!\n${this.configService.getOrThrow(CONFIG_VIDEOS_BASE_URL_KEY) + '/' + newFilename}`,
            );
          }
        }
      }
    });
  }
}
