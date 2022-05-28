import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import authConfig from './auth';
import databaseConfig from './database';
import globalConfig from './global';
import loggingConfig from './logging';
import serverConfig from './server';
import storageConfig from './storage';

/**
 * Configuration module
 * 
 * This module is used to set up the configuration for the application.
 * Use the `ConfigService` (from `@nestjs/config`) to access the configuration.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [globalConfig, serverConfig, databaseConfig, storageConfig, loggingConfig, authConfig]
    }),
  ]
})
export class ConfigModule {}
