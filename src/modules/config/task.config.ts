import { registerAs } from '@nestjs/config';

const config = registerAs('task', () => ({
  resetUsernameChangeCount: {
    name: 'reset-username-change-count',
    cron: process.env.CRON_RESET_USERNAME_CHANGE_COUNT
  }
}));

export type TaskConfig = typeof config;
export default config;
