import { registerAs } from '@nestjs/config';

const config = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 80,
  platforms: {
    web: {
      loginSuccess: process.env.PLATFORM_WEB_LOGIN_SUCCESS
    },
    mobile: {
      loginSuccess: process.env.PLATFORM_MOBILE_LOGIN_SUCCESS
    }
  }
}));

export type AppConfig = typeof config;
export default config;
