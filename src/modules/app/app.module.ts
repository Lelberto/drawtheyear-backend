import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import { ConfigModule } from '../config/config.module';
import { NodeEnv } from '../config/global';
import { LoggingConfig } from '../config/logging';
import { ControllerModule } from '../controllers/controller.module';
import { DatabaseModule } from '../database/database.module';
import { ExsceptionModule } from '../exceptions/exception.module';
import { AccessLogger } from '../logger/access.logger';
import { AppLogger } from '../logger/app.logger';
import { LoggerModule } from '../logger/logger.module';

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
    ControllerModule,
    ExsceptionModule
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
