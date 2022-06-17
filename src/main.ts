import { ClassSerializerInterceptor, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './modules/app/app.module';
import { ServerConfig } from './modules/config/server';
import { ExceptionService } from './modules/exceptions/exception.service';
import { HttpExceptionFilter } from './modules/exceptions/filters/http.filter';
import { TypeOrmExceptionFilter } from './modules/exceptions/filters/typeorm.filter';
import { AppLogger } from './modules/logger/app.logger';

/**
 * Bootstraps the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const serverConfig = app.get(ConfigService).get<ServerConfig>('server');
  const logger = app.get(AppLogger);
  const exceptionService = app.get(ExceptionService);

  // Setup application
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL]
  });
  app.enableCors({
    origin: serverConfig.cors.origin
  });
  app.use(helmet());
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(exceptionService),
    new TypeOrmExceptionFilter(exceptionService)
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
