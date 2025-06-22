import { Injectable } from '@nestjs/common';
import { writeFile } from 'node:fs/promises';
import { ENV_WATCH_DIRECTORY_PATH_KEY } from '../common/constants/env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobsService {
  private readonly watchDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = this.configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
  }

  async uploadFile(file: Express.Multer.File) {
    const temporaryUniqueFileId = crypto.randomUUID();
    const inputFilePath = `${this.inputWatchDirectoryPath}/${temporaryUniqueFileId}-${file.originalname}`;

    await writeFile(inputFilePath, file.buffer);
  }
}
