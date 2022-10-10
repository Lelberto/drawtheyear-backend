import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { ImportCommand } from './import.command';

@Module({
  providers: [
    CommandService,
    ImportCommand
  ]
})
export class CommandModule {}
