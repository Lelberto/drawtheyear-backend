import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import taskConfig, { TaskConfig } from '../../config/task.config';
import { UserService } from '../../users/user.service';
import { Job } from './job';

@Injectable()
export class ResetUsernameChangeCountJob extends Job {
  
  private readonly userService: UserService;

  public constructor(userService: UserService, @Inject(taskConfig.KEY) config: ConfigType<TaskConfig>) {
    super(config.resetUsernameChangeCount.name, config.resetUsernameChangeCount.cron);
    this.userService = userService;
  }

  public async execute(): Promise<void> {
    await this.userService.resetUsernameChangeCount();
  }
}
