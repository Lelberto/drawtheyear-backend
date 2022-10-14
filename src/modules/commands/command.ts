import { padStart } from 'lodash';

export enum ExitCode {
  OK = 0,
  ERROR = 1
}

export type CommandOption = {
  key: string;
  value: string
}

export abstract class Command {

  public static readonly KEY = Symbol(Command.constructor.name);
  private static readonly PROGRESS_BAR_FILLED_CHAR = '♦';
  private static readonly PROGRESS_BAR_EMPTY_CHAR = '○';
  private static readonly PROGRESS_BAR_VALUE_LENGTH = 30;

  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public abstract execute(args: string[], options: CommandOption[]): ExitCode | Promise<ExitCode>;

  protected inlineLog(value: string): void {
    const { stdout } = process;
    stdout.clearLine(0);
    stdout.cursorTo(0);
    stdout.write(value);
  }
  
  protected progressBar(current: number, max: number, value = ''): void {
    const { stdout } = process;
    const barSize = stdout.getWindowSize()[0] - Command.PROGRESS_BAR_VALUE_LENGTH;
    const filledSize = (current / max) * barSize;
    let bar = '';
    for (let i = 0; i < barSize; i++) {
      bar += (i <= filledSize) ? Command.PROGRESS_BAR_FILLED_CHAR : Command.PROGRESS_BAR_EMPTY_CHAR;
    }
    this.inlineLog(bar + padStart(value, Command.PROGRESS_BAR_VALUE_LENGTH, ' '));
  }
}
