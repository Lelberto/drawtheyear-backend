import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AppConfig } from './modules/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const appConfig = app.get(ConfigService).get<ConfigType<AppConfig>>('app');

  await app.listen(appConfig.port);
}
bootstrap();
