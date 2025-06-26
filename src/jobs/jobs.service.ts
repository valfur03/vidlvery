import { Injectable } from '@nestjs/common';
import { Job } from './job.type';
import { FsService } from '../fs/fs.service';
import { VideosService } from '../videos/videos.service';
import { EncoderService } from '../encoder/encoder.service';
import { NotifierService } from '../notifier/notifier.service';

@Injectable()
export class JobsService {
  private readonly tmpUploadDirectoryPath = '/tmp/vidlvery';

  constructor(
    private readonly fsService: FsService,
    private readonly encoderService: EncoderService,
    private readonly videosService: VideosService,
    private readonly notifierService: NotifierService,
  ) {}

  async schedule(job: Job) {
    const videoFilePath = await this.encoderService.encodeFile(job.file.path);
    const video = await this.videosService.moveFile(videoFilePath, job);
    await this.notifierService.notify(video.job);
  }

  async add(file: Express.Multer.File, initiatorEmailAddress: string): Promise<Job> {
    const temporaryUniqueFileId = crypto.randomUUID();
    const inputFilePwdPath = this.tmpUploadDirectoryPath;
    const inputFilePath = `${inputFilePwdPath}/${temporaryUniqueFileId}-${file.originalname}`;

    await this.fsService.writeFile(inputFilePath, file.buffer, inputFilePwdPath);

    const job = {
      id: temporaryUniqueFileId,
      file: {
        name: file.originalname,
        path: inputFilePath,
      },
      initiator: {
        email: initiatorEmailAddress,
      },
    };
    this.schedule(job);

    return job;
  }
}
