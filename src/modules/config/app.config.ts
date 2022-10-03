import { registerAs } from '@nestjs/config';

const config = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 80
}));

export type AppConfig = typeof config;
export default config;
