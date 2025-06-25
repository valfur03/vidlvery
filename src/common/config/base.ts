import { z } from 'zod';
import * as process from 'node:process';

const baseConfigSchema = z.object({
  publicDirectoryPath: z.string(),
  videosBaseUrl: z.string(),
  disableFfmpeg: z.string().default('false'),
});

export default () =>
  baseConfigSchema.parse({
    publicDirectoryPath: process.env.PUBLIC_DIRECTORY_PATH,
    videosBaseUrl: process.env.VIDEOS_BASE_URL,
    disableFfmpeg: process.env.DISABLE_FFMPEG,
  });
