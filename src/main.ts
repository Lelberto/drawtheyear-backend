import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppLogger } from './logger/app.logger';

/**
 * Bootstraps the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(AppLogger);

  app.useLogger(logger);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor()
  );
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  // Setups swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('DrawTheYear API')
    .setDescription('DrawTheYear API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
