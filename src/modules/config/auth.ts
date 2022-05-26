/** Authentication configuration */

export type AuthConfig = {
  jwt: {
    accessToken: {
      secretKey: string;
      expiration: string;
    };
    refreshToken: {
      secretKey: string;
      expiration: string;
    };
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export default (): { auth: AuthConfig } => ({
  auth: {
    jwt: {
      accessToken: {
        secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY || 'secret',
        expiration: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRATION || '60s'
      },
      refreshToken: {
        secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY || 'secret',
        expiration: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRATION || '7d'
      },
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.AUTH_GOOGLE_CALLBACK_URL
    }
  }
});
