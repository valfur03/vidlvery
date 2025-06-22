import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers('Remote-Email') initiatorEmailAddress: string | undefined,
  ) {
    if (!initiatorEmailAddress) {
      throw new BadRequestException('Must have an initiator email address in headers.');
    }

    await this.jobsService.uploadFile(file, initiatorEmailAddress);
  }
}
