import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import { ENV_WATCH_DIRECTORY_PATH_KEY } from '../common/constants/env';

@Controller('jobs')
export class JobsController {
  private readonly watchDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const temporaryUniqueFileId = crypto.randomUUID();
    const inputFilePath = `${this.inputWatchDirectoryPath}/${temporaryUniqueFileId}-${file.originalname}`;

    await writeFile(inputFilePath, file.buffer);
  }
}
