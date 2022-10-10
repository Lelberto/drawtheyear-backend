import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { DayService } from '../days/day.service';
import { EmotionService } from '../emotions/emotion.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { UserService } from '../users/user.service';
import { Command, CommandOption, ExitCode } from './command';

export type ImportFile = {
  user: string;
  days: {
    date: Date;
    resume: string;
    emotions: [string, string];
  }[];
}

@Injectable()
export class ImportCommand extends Command {

  private readonly userService: UserService;
  private readonly emotionService: EmotionService;
  private readonly dayService: DayService;

  public constructor(userService: UserService, emotionService: EmotionService, dayService: DayService) {
    super('import');
    this.userService = userService;
    this.emotionService = emotionService;
    this.dayService = dayService;
  }

  public async execute(args: string[], options: CommandOption[]): Promise<ExitCode> {
    const filePathOpt = options.find(opt => opt.key === 'file' || opt.key === 'f');
    if (!filePathOpt) {
      throw new Error('No file path specified');
    }
    const userOpt = options.find(opt => opt.key === 'user' || opt.key === 'u');
    if (!userOpt) {
      throw new Error('No user specified');
    }

    const data = await this.load(filePathOpt.value);
    const user = await this.userService.findById(userOpt.value);

    for (let i = 0; i < data.days.length; i++) {
      this.progressBar(i, data.days.length, `Importing day ${i + 1}/${data.days.length}`);
      const dataDay = data.days[i];
      try {
        const day = await this.dayService.create({ date: dataDay.date, resume: dataDay.resume }, user);
        for (const emotionName of dataDay.emotions) {
          if (emotionName) {
            let emotion: Emotion;
            if (await this.emotionService.exists({ user, name: emotionName })) {
              emotion = await this.emotionService.findByName(user, emotionName);
            } else {
              emotion = await this.emotionService.create({ name: emotionName, color: '#000000' }, user);
            }
            await this.dayService.addEmotion(day, emotion);
          }
        }
      } catch (err) {
        console.error(`Could not create day ${dataDay.date}`, err);
      }
    }

    return ExitCode.OK;
  }

  private async load(filePath: string): Promise<ImportFile> {
    const content = (await readFile(filePath, 'utf-8') as unknown as Buffer).toString();
    return JSON.parse(content);
  }
}
