import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import roleConfig from './role.config';
import taskConfig from './task.config';
import userConfig from './user.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [appConfig, taskConfig, databaseConfig, authConfig, userConfig, roleConfig]
    })
  ]
})
export class ConfigModule {}
