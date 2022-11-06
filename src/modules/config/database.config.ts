import { registerAs } from '@nestjs/config';
import { DayEmotion } from '../days/entities/day-emotion.entity';
import { Day } from '../days/entities/day.entity';
import { Emotion } from '../emotions/entities/emotion.entity';
import { User } from '../users/entities/user.entity';

const config = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Emotion, Day, DayEmotion]
}));

export type DatabaseConfig = typeof config;
export default config;
