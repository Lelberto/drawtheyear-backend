/** Server configuration */

export type ServerConfig = {
  port: number;
  pagination: {
    maxLimit: number;
  };
}

export default (): { server: ServerConfig } => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    pagination: {
      maxLimit: parseInt(process.env.PAGINATION_LIMIT_MAX, 10) || 10
    }
  }
});
