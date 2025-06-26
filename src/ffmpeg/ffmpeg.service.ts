import { Injectable } from '@nestjs/common';
import { execFile as _execFile } from 'node:child_process';
import { FsService } from '../fs/fs.service';
import { ConfigService } from '@nestjs/config';
import { CONFIG_DISABLE_FFMPEG_KEY } from '../common/constants/env';
import util from 'node:util';

const execFile = util.promisify(_execFile);

@Injectable()
export class FfmpegService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fsService: FsService,
  ) {}

  execFfmpegCommand(args: readonly string[] | undefined | null, outputFilePath: string) {
    if (this.configService.getOrThrow(CONFIG_DISABLE_FFMPEG_KEY) === 'true') {
      return;
    }

    return execFile('ffmpeg', args ? [...args, outputFilePath] : undefined)
      .then(() => {
        if (!this.fsService.exists(outputFilePath)) {
          throw new Error('ffmpeg did not complete successfully');
        }
      })
      .catch((error) => {
        if (error) {
          throw error;
        }
      });
  }

  performMostStandardEncoding(filePath: string, outputFilePath: string) {
    return this.execFfmpegCommand(
      [
        '-i',
        filePath,
        '-c:v',
        'libx264',
        '-preset',
        'fast',
        '-crf',
        '18',
        '-profile:v',
        'high',
        '-pix_fmt',
        'yuv420p',
        '-c:a',
        'aac',
        '-b:a',
        '320k',
      ],
      outputFilePath,
    );
  }
}
