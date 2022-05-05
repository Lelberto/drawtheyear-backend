import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database';
import globalConfig, { NodeEnv } from 'config/global';
import loggingConfig, { LoggingConfig } from 'config/logging';
import serverConfig from 'config/server';
import * as morgan from 'morgan';
import { DatabaseModule } from './database/database.module';
import { DayModule } from './days/day.module';
import { EmotionModule } from './emotions/emotion.module';
import { HateoasModule } from './hateoas/hateoas.module';
import { AccessLogger } from './logger/access.logger';
import { AppLogger } from './logger/app.logger';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './users/user.module';

/**
 * App module
 * 
 * This is the application root module.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [globalConfig, serverConfig, databaseConfig, loggingConfig]
    }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    EmotionModule,
    DayModule,
    HateoasModule
  ]
})
export class AppModule implements NestModule, OnApplicationBootstrap {

  private readonly config: ConfigService;
  private readonly appLogger: AppLogger;
  private readonly accessLogger: AccessLogger;

  public constructor(config: ConfigService, appLogger: AppLogger, accessLogger: AccessLogger) {
    this.config = config;
    this.appLogger = appLogger;
    this.accessLogger = accessLogger;
  }

  public onApplicationBootstrap() {
    this.appLogger.log(`Environment: ${this.config.get<NodeEnv>('env')}`);
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.createMorganMiddleware()).forRoutes('*');
  }

  /**
   * Creates the Express Morgan middleware
   * 
   * @returns Express Morgan middleware
   */
  private createMorganMiddleware() {
    return morgan(this.config.get<LoggingConfig>('logging').accessFormat, {
      stream: {
        write: msg => this.accessLogger.log(msg)
      }
    });
  }
}
