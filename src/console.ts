import { NestFactory } from '@nestjs/core';
import { CommandModule } from './modules/commands/command.module';
import { CommandService } from './modules/commands/command.service';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  await app.get(CommandService).execute(process.argv);
  await app.close();
}
bootstrap();
