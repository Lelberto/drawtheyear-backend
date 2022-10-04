import { registerAs } from '@nestjs/config';
import { parseBoolean } from '../../common/utils/utils';

const config = registerAs('task', () => ({
  enabled: parseBoolean(process.env.CRON_ENABLED) || false,
  resetUsernameChangeCount: {
    name: 'reset-username-change-count',
    cron: process.env.CRON_RESET_USERNAME_CHANGE_COUNT
  }
}));

export type TaskConfig = typeof config;
export default config;
