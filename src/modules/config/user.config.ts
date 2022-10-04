import { registerAs } from '@nestjs/config';

const config = registerAs('user', () => ({
  usernameMaxChangeCountPerDay: 3
}));

export type UserConfig = typeof config;
export default config;
