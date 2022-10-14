import { Injectable } from '@nestjs/common';
import { ImportCommand } from './import.command';
import { Command, ExitCode } from './command';
import { ChangeRoleCommand } from './change-role.command';

@Injectable()
export class CommandService {

  private readonly commands: Command[];

  public constructor(importCmd: ImportCommand, changeRoleCmd: ChangeRoleCommand) {
    this.commands = [
      importCmd,
      changeRoleCmd
    ]
  }

  public async execute(argv: string[]) {
    const cmdName = argv[2];
    const args = argv.splice(3, argv.length - 1);
    const cmd = this.commands.find(cmd => cmd.name === cmdName);
    if (!cmd) {
      throw new Error(`Unknow command ${cmdName}`);
    }
    console.info(`Executing command ${cmd.name}`);
    let code: ExitCode;
    try {
      code = await cmd.execute(this.buildArguments(args), this.buildOptions(args));
    } catch (err) {
      code = ExitCode.ERROR;
      console.error(`Error when executing command ${cmd.name}`);
      console.error(err);
    }
    console.info(`Command ${cmd.name} exited with code ${code}`);
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
