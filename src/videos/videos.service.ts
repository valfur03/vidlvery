import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import crypto = require('crypto');
import { ConfigService } from '@nestjs/config';
import { CONFIG_PUBLIC_DIRECTORY_PATH_KEY } from '../common/constants/env';
import * as path from 'node:path';
import { trimFileExtension } from '../common/utils/trim-file-extension';
import { FsService } from '../fs/fs.service';
import { Video } from './video.type';
import { Job } from '../jobs/job.type';

@Injectable()
export class VideosService {
  private readonly MIN_ID_LENGTH = 8;
  private readonly publicDirectoryPath: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly fsService: FsService,
  ) {
    this.publicDirectoryPath = this.configService.getOrThrow(CONFIG_PUBLIC_DIRECTORY_PATH_KEY);
  }

  async moveFile(filePath: string, job: Job): Promise<Video> {
    const videoId = await this.generateId(filePath);

    await this.fsService.mv(filePath, `${this.publicDirectoryPath}/${videoId}/${job.file.name}`);

    return {
      job: {
        ...job,
        file: {
          ...job.file,
          id: videoId,
        },
      },
    };
  }

  async getAll() {
    return fs
      .readdir(this.publicDirectoryPath)
      .then((filesPath) => {
        return filesPath.map((file) => ({
          id: trimFileExtension(path.basename(file)),
        }));
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Could not get all videos.');
      });
  }

  async sliceIdWithoutOverlaping(id: string) {
    const filesId = (await this.getAll()).map(({ id }) => id);

    let currentId = id.slice(0, this.MIN_ID_LENGTH);
    for (let i = 0; filesId.includes(currentId); i++) {
      currentId = id.slice(0, this.MIN_ID_LENGTH + i);
    }

    return currentId;
  }

  async generateId(filePath: string) {
    return fs
      .readFile(filePath)
      .then((buffer) => {
        const digest = crypto.createHash('sha256').update(buffer).digest('base64');

        return this.sliceIdWithoutOverlaping(digest);
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Could not generate an ID from the video file.');
      });
  }
}
