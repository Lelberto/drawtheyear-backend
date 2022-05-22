/** Authentication configuration */

export type AuthConfig = {
  jwt: {
    secretKey: string;
    expiration: string;
  };
}

export default (): { auth: AuthConfig } => ({
  auth: {
    jwt: {
      secretKey: process.env.AUTH_JWT_SECRET_KEY || 'secret',
      expiration: process.env.AUTH_JWT_EXPIRATION || '60s'
    }
  }
});
