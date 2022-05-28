import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { ConfigModule } from './modules/config/config.module';
import { NodeEnv } from './modules/config/global';
import { LoggingConfig } from './modules/config/logging';
import { ControllerModule } from './modules/controllers/controller.module';
import { DatabaseModule } from './modules/database/database.module';
import { AccessLogger } from './modules/logger/access.logger';
import { AppLogger } from './modules/logger/app.logger';
import { LoggerModule } from './modules/logger/logger.module';

/**
 * Application module
 * 
 * This is the application root module.
 */
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LoggerModule,
    ControllerModule
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
