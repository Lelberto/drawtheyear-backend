import { registerAs } from '@nestjs/config';

const config = registerAs('storage', () => ({
  type: process.env.STORAGE_TYPE || 'local',
  local: {
    root: 'data/storage'
  },
  s3: {
    accessKey: process.env.STORAGE_S3_ACCESS_KEY,
    secretKey: process.env.STORAGE_S3_SECRET_KEY,
    bucket: process.env.STORAGE_S3_BUCKET
  }
}));

export type StorageConfig = typeof config;
export default config;
