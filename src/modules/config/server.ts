/** Server configuration */

export type ServerConfig = {
  port: number;
  cors: {
    origin: string[] | false;
  };
  pagination: {
    maxLimit: number;
  };
}

export default (): { server: ServerConfig } => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    cors: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : false
    },
    pagination: {
      maxLimit: parseInt(process.env.PAGINATION_LIMIT_MAX, 10) || 10
    }
  }
});
