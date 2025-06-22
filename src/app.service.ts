import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { watch, mkdirSync, rename } from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { ENV_PUBLIC_DIRECTORY_PATH_KEY, ENV_WATCH_DIRECTORY_PATH_KEY } from './common/constants/env';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly watchDirectoryPath: string;
  private readonly publicDirectoryPath: string;
  private readonly inputWatchDirectoryPath: string;
  private readonly outputWatchDirectoryPath: string;

  constructor(private readonly configService: ConfigService) {
    this.watchDirectoryPath = this.configService.getOrThrow(ENV_WATCH_DIRECTORY_PATH_KEY);
    this.publicDirectoryPath = this.configService.getOrThrow(ENV_PUBLIC_DIRECTORY_PATH_KEY);
    this.inputWatchDirectoryPath = `${this.watchDirectoryPath}/in`;
    this.outputWatchDirectoryPath = `${this.watchDirectoryPath}/out`;
  }

  onApplicationBootstrap() {
    mkdirSync(this.inputWatchDirectoryPath, { recursive: true });
    mkdirSync(this.outputWatchDirectoryPath, { recursive: true });

    watch(this.outputWatchDirectoryPath, undefined, (event, filename) => {
      switch (event) {
        case 'change': {
          if (filename === null) {
            return;
          }

          const newFilename = filename.replace(/^.+-id-/, '');

          rename(
            `${this.outputWatchDirectoryPath}/${filename}`,
            `${this.publicDirectoryPath}/${newFilename}`,
            (error) => {
              if (error) {
                throw error;
              }
            },
          );
        }
      }
    });
  }
}
