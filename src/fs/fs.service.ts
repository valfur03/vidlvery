import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import { stat } from 'node:fs';
import { dirname } from 'node:path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import mv = require('mv');

@Injectable()
export class FsService {
  async mv(oldPath: string, newPath: string) {
    return mv(oldPath, newPath, { mkdirp: true }, (error) => {
      if (error) {
        throw error;
      }
    });
  }

  async writeFile(filePath: string, data: Buffer, filePwdPath = dirname(filePath)) {
    await mkdir(filePwdPath, { recursive: true });
    return writeFile(filePath, data);
  }

  async exists(filePath: string) {
    return stat(filePath, (error) => {
      return error === null;
    });
  }
}
