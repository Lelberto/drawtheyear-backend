import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { DayModule } from '../days/day.module';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { CommandService } from './command.service';
import { ImportCommand } from './import.command';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    EmotionModule,
    DayModule
  ],
  providers: [
    CommandService,
    ImportCommand
  ]
})
export class CommandModule {}
