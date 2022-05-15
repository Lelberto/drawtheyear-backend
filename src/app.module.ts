import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/database';
import globalConfig, { NodeEnv } from 'src/config/global';
import loggingConfig, { LoggingConfig } from 'src/config/logging';
import serverConfig from 'src/config/server';
import * as morgan from 'morgan';
import { DatabaseModule } from './modules/database/database.module';
import { DayModule } from './modules/days/day.module';
import { EmotionModule } from './modules/emotions/emotion.module';
import { HateoasModule } from './modules/hateoas/hateoas.module';
import { AccessLogger } from './modules/logger/access.logger';
import { AppLogger } from './modules/logger/app.logger';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/users/user.module';

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
