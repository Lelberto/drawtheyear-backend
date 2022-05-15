import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from 'src/modules/config/database';
import globalConfig from 'src/modules/config/global';
import loggingConfig from 'src/modules/config/logging';
import serverConfig from 'src/modules/config/server';

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
      load: [globalConfig, serverConfig, databaseConfig, loggingConfig]
    }),
  ],
  exports: [NestConfigModule]
})
export class ConfigModule {}
