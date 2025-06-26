import { Injectable } from '@nestjs/common';
import { basename, dirname } from 'node:path';
import { FfmpegService } from '../ffmpeg/ffmpeg.service';

@Injectable()
export class EncoderService {
  static defaultOutputFilePath(filePath: string) {
    return `${dirname(filePath)}/out-${basename(filePath)}`;
  }

  constructor(private readonly ffmpegService: FfmpegService) {}

  async encodeFile(filePath: string, _outputFilePath?: string) {
    const outputFilePath = _outputFilePath ?? EncoderService.defaultOutputFilePath(filePath);

    const encodingChildProcess = await this.ffmpegService.performMostStandardEncoding(filePath, outputFilePath);
    if (encodingChildProcess === undefined) {
      return filePath;
    }

    return outputFilePath;
  }
}
