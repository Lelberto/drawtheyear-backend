import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { DatabaseConfig } from 'config/database';
import globalConfig, { NodeEnv } from 'config/global';
import loggingConfig, { LoggingConfig } from 'config/logging';
import serverConfig from 'config/server';
import * as morgan from 'morgan';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Day } from './days/day.entity';
import { DayModule } from './days/day.module';
import { Emotion } from './emotions/emotion.entity';
import { EmotionModule } from './emotions/emotion.module';
import { HateoasModule } from './hateoas/hateoas.module';
import { AccessLogger } from './logger/access.logger';
import { AppLogger } from './logger/app.logger';
import { DatabaseLogger } from './logger/database.logger';
import { LoggerModule } from './logger/logger.module';
import { User } from './users/user.entity';
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
          entities: [User, Emotion, Day],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: env !== 'production',
          dropSchema: env === 'test',
          maxQueryExecutionTime: 1000,
          logger,
          logging: env === 'development'
        }
      },
      inject: [ConfigService, DatabaseLogger]
    }),
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
