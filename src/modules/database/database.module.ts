import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Attachment } from '../attachments/entities/attachment.entity';
import { DatabaseConfig } from '../config/database';
import { NodeEnv } from '../config/global';
import { Day } from '../days/entities/day.entity';
import { Emotion } from '../emotions/entities/emotion.entity';
import { DatabaseLogger } from '../logger/database.logger';
import { User } from '../users/entities/user.entity';

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
          entities: [User, Emotion, Day, Attachment],
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
