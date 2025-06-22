import { Injectable } from '@nestjs/common';
import { writeFile } from 'node:fs/promises';
import { ENV_WATCH_DIRECTORY_PATH_KEY } from '../common/constants/env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobsService {
  private readonly watchDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;
  private readonly jobs = new Map<string, { initiator: { emailAddress: string } }>();

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = this.configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
  }

  async uploadFile(file: Express.Multer.File, initiatorEmailAddress: string) {
    const temporaryUniqueFileId = crypto.randomUUID();
    const inputFileName = `${temporaryUniqueFileId}-id-${file.originalname}`;
    const inputFilePath = `${this.inputWatchDirectoryPath}/${inputFileName}`;

    this.jobs.set(inputFileName, { initiator: { emailAddress: initiatorEmailAddress } });
    await writeFile(inputFilePath, file.buffer);
  }

  popByFilename(filename: string) {
    const job = this.jobs.get(filename);
    this.jobs.delete(filename);
    return job;
  }
}
