import { z } from 'zod';
import * as process from 'node:process';
import { getEnvFromSecretFile } from '../utils/get-env-from-secret-file';

const smtpConfigSchema = z
  .object({
    smtp: z.object({
      from: z.string(),
      host: z.string(),
      port: z.coerce.number().default(587),
      secure: z.string().default('false'),
      user: z.string(),
      pass: z.string().optional(),
      pass_file: z.string().optional(),
    }),
  })
  .transform(({ smtp }, ctx) => {
    if (smtp.pass === undefined && smtp.pass_file === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: 'SMTP password must be set',
      });

      return z.NEVER;
    }

    const pass = smtp.pass || getEnvFromSecretFile(smtp.pass_file!);

    return {
      smtp: {
        from: smtp.from,
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure === 'true',
        user: smtp.user,
        pass,
      },
    };
  });

export default () =>
  smtpConfigSchema.parse({
    smtp: {
      from: process.env.SMTP_FROM,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      pass_file: process.env.SMTP_PASS_FILE,
    },
  });
