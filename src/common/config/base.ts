import { z } from 'zod';
import * as process from 'node:process';

const baseConfigSchema = z.object({
  watchDirectoryPath: z.string(),
  publicDirectoryPath: z.string(),
  videosBaseUrl: z.string(),
});

export default () =>
  baseConfigSchema.parse({
    watchDirectoryPath: process.env.WATCH_DIRECTORY_PATH,
    publicDirectoryPath: process.env.PUBLIC_DIRECTORY_PATH,
    videosBaseUrl: process.env.VIDEOS_BASE_URL,
  });
