import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfig } from '../config/database';
import { NodeEnv } from '../config/global';
import { Day } from '../days/day.entity';
import { Emotion } from '../emotions/emotion.entity';
import { DatabaseLogger } from '../logger/database.logger';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService, logger: DatabaseLogger) => {
        const env = configService.get<NodeEnv>('env');
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: config.type as any,
          host: config.url,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [User, Emotion, Day],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: env !== 'production',
          dropSchema: env === 'test',
          maxQueryExecutionTime: 1000,
          logger,
          logging: env === 'development'
        }
      },
      inject: [ConfigService, DatabaseLogger]
    })
  ]
})
export class DatabaseModule {}
