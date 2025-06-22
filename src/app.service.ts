import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { existsSync, mkdirSync } from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { ENV_WATCH_DIRECTORY_PATH_KEY } from './common/constants/env';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly watchDirectoryPath: string;

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
  }

  onApplicationBootstrap() {
    if (!existsSync(this.watchDirectoryPath)) {
      mkdirSync(this.watchDirectoryPath);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
