import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '../users/user.module';
import { ResetUsernameChangeCountJob } from './jobs/reset-username-change-count.job';
import { TaskService } from './task.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule
  ],
  providers: [
    TaskService,
    ResetUsernameChangeCountJob
  ]
})
export class TaskModule {}
