import { registerAs } from '@nestjs/config';

const config = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 80,
  platforms: {
    web: {
      loginCallback: process.env.PLATFORM_WEB_LOGIN_CALLBACK
    },
    mobile: {
      loginCallback: process.env.PLATFORM_MOBILE_LOGIN_CALLBACK
    }
  }
}));

export type AppConfig = typeof config;
export default config;
