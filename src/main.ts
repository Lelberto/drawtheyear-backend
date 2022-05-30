import { ClassSerializerInterceptor, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { ServerConfig } from './modules/config/server';
import { AppLogger } from './modules/logger/app.logger';

/**
 * Bootstraps the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const serverConfig = app.get(ConfigService).get<ServerConfig>('server');
  const logger = app.get(AppLogger);

  // Setup application
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL]
  });
  app.enableCors({
    origin: serverConfig.cors.origin
  });
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  app.useGlobalFilters(
    new EntityNotFoundExceptionFilter()
  );

  // Setup swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('DrawTheYear API')
    .setDescription('DrawTheYear API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(serverConfig.port);
}

bootstrap();
