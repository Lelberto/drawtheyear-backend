/** Server configuration */

export type ServerConfig = {
  port: number;
}

export default (): { server: ServerConfig } => ({
  server: {
    port: parseInt(process.env.PORT, 10)
  }
});
