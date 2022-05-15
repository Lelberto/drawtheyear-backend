import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from 'src/modules/config/database';
import globalConfig from 'src/modules/config/global';
import loggingConfig from 'src/modules/config/logging';
import serverConfig from 'src/modules/config/server';

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
