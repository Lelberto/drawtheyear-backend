import { registerAs } from '@nestjs/config';

const config = registerAs('auth', () => ({
  google: {
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
  }
}));

export type AuthConfig = typeof config;
export default config;
