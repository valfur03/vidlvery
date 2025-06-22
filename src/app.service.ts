import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { mkdirSync } from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { ENV_WATCH_DIRECTORY_PATH_KEY } from './common/constants/env';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly watchDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;
  private readonly outputWatchDirectoryPath: string;

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = this.configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
    this.outputWatchDirectoryPath = `${this.watchDirectoryPath}/out`;
  }

  onApplicationBootstrap() {
    mkdirSync(this.inputWatchDirectoryPath, { recursive: true });
    mkdirSync(this.outputWatchDirectoryPath, { recursive: true });
  }
}
