import { readFileSync } from 'node:fs';

export const getEnvFromSecretFile = (secret: string) => {
  return readFileSync(secret, 'utf8');
};
