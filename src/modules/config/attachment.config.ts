import { registerAs } from '@nestjs/config';

const config = registerAs('attachments', () => ({
  storage: {
    root: 'attachments'
  }
}));

export type AttachmentConfig = typeof config;
export default config;
