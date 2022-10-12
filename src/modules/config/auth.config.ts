import { registerAs } from '@nestjs/config';

const config = registerAs('auth', () => ({
  google: {
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
  },
  accessToken: {
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    expiration: parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRATION, 10)
  },
  refreshToken: {
    secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
    expiration: parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRATION, 10)
  }
}));

export type AuthConfig = typeof config;
export default config;
