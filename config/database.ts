/** Database configuration */

export type DatabaseConfig = {
  type: string;
  url: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export default (): { database: DatabaseConfig } => ({
  database: {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  }
});
