import { Injectable } from '@nestjs/common';
import { Command, CommandOption } from './command';

@Injectable()
export class ImportCommand extends Command {

  public constructor() {
    super('import');
  }

  public execute<A extends string>(args: A[], options: CommandOption[]): void | Promise<void> {
    const filePath = options.find(opt => opt.key === 'file' || opt.key === 'f');
    if (!filePath) {
      throw new Error('No file path specified');
    }
    const mappingPath = options.find(opt => opt.key === 'mapping' || opt.key === 'm');
    if (!mappingPath) {
      throw new Error('No mapping path specified');
    }
    console.log('Importing...', filePath, mappingPath);
  }
}
