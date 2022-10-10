import { Injectable } from '@nestjs/common';
import { ImportCommand } from './import.command';
import { Command } from './command';

@Injectable()
export class CommandService {

  private readonly commands: Command[];

  public constructor(importCmd: ImportCommand) {
    this.commands = [
      importCmd
    ]
  }

  public async execute(argv: string[]) {
    const cmdName = argv[2];
    const args = argv.splice(3, argv.length - 1);
    const cmd = this.commands.find(cmd => cmd.name === cmdName);
    if (!cmd) {
      throw new Error(`Unknow command ${cmdName}`);
    }
    await cmd.execute(this.buildArguments(args), this.buildOptions(args));
  }

  private buildArguments(argv: string[]): string[] {
    const args = [];
    for (const arg of argv) {
      if (arg.startsWith('-')) {
        break;
      }
      args.push(arg);
    }
    return args;
  }

  private buildOptions(argv: string[]): { key: string; value: string; }[] {
    const args = argv.splice(argv.findIndex(arg => arg.startsWith('-')), argv.length);
    const options = [];
    for (let i = 0; i < args.length; i++) {
      const opt = args[i];
      if (opt.startsWith('-')) {
        const nextOpt = args[i + 1];
        if (nextOpt?.startsWith('-')) {
          options.push({ key: opt.replace(/-/, ''), value: null });
        } else {
          options.push({ key: opt.replace(/-/, ''), value: nextOpt })
        }
      }
    }
    return options;
  }
}
