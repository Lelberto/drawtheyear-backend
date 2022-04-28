import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { AppLogger } from './logger/app.logger';

/**
 * Bootstraps the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(AppLogger);

  app.useLogger(logger);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  await app.listen(3000);
}

bootstrap();
