import { readFileSync } from 'node:fs';

export const getEnvFromSecretFile = (secret: string) => {
  return readFileSync(`/run/secrets/${secret}`, 'utf8');
};
