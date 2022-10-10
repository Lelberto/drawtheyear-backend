export type CommandArgument = string;

export type CommandOption = {
  key: string;
  value: string
}

export abstract class Command {

  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public abstract execute<A extends CommandArgument>(args: A[], options: CommandOption[]): void | Promise<void>;
}
