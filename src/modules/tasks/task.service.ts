import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Job } from './jobs/job';
import { ResetUsernameChangeCountJob } from './jobs/reset-username-change-count.job';

@Injectable()
export class TaskService implements OnApplicationBootstrap {

  private readonly schedulerRegistry: SchedulerRegistry;
  private readonly jobs: Job[];

  public constructor(
    schedulerRegistry: SchedulerRegistry,
    resetUsernameChangeCountJob: ResetUsernameChangeCountJob
  ) {
    this.schedulerRegistry = schedulerRegistry;
    this.jobs = [
      resetUsernameChangeCountJob
    ]
  }

  public async onApplicationBootstrap() {
    await this.loadJobs();
  }

  private async loadJobs(): Promise<void> {
    this.jobs.forEach(job => {
      const cronJob = new CronJob(job.time, () => job.execute());
      this.schedulerRegistry.addCronJob(job.name, cronJob);
      cronJob.start();
      console.log(`Loaded cron job ${job.name} (${job.time})`);
    });
  }
}
