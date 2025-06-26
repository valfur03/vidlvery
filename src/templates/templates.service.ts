import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import Handlebars from 'handlebars';
import { JobDoneData } from './template.type';

@Injectable()
export class TemplatesService {
  private readonly SOURCES_BASE_DIRECTORY = './src/templates/sources';
  private readonly jobDoneTextTemplate: HandlebarsTemplateDelegate<JobDoneData>;

  constructor() {
    this.jobDoneTextTemplate = Handlebars.compile(
      readFileSync(`${this.SOURCES_BASE_DIRECTORY}/job-done.txt`).toString(),
    );
  }

  getJobDoneText(data: JobDoneData) {
    return this.jobDoneTextTemplate(data);
  }
}
