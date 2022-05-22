/** Authentication configuration */

export type AuthConfig = {
  jwt: {
    secretKey: string;
    expiration: string;
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
      secretKey: process.env.AUTH_JWT_SECRET_KEY || 'secret',
      expiration: process.env.AUTH_JWT_EXPIRATION || '60s'
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.AUTH_GOOGLE_CALLBACK_URL
    }
  }
});
