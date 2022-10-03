import { Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const env = config.get('env');
        const dbConfig = config.get<ConfigType<DatabaseConfig>>('database');
        return {
          host: dbConfig.url,
          type: dbConfig.type as any,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: dbConfig.entities,
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: env !== 'production',
          dropSchema: env === 'test',
          maxQueryExecutionTime: 1000,
          logging: env === 'development'
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
