import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import taskConfig, { TaskConfig } from '../config/task.config';
import { Job } from './jobs/job';
import { ResetUsernameChangeCountJob } from './jobs/reset-username-change-count.job';

@Injectable()
export class TaskService implements OnApplicationBootstrap, OnApplicationShutdown {

  private readonly config: ConfigType<TaskConfig>;
  private readonly schedulerRegistry: SchedulerRegistry;
  private readonly jobs: Job[];

  public constructor(
    @Inject(taskConfig.KEY) config: ConfigType<TaskConfig>,
    schedulerRegistry: SchedulerRegistry,
    resetUsernameChangeCountJob: ResetUsernameChangeCountJob
  ) {
    this.config = config;
    this.schedulerRegistry = schedulerRegistry;
    this.jobs = [
      resetUsernameChangeCountJob
    ]
  }

  public async onApplicationBootstrap() {
    if (this.config.enabled) {
      await this.startJobs();
    } else {
      console.log('Cron jobs disabled');
    }
  }

  public async onApplicationShutdown() {
    if (this.config.enabled) {
      await this.stopJobs();
    }
  }

  private async startJobs(): Promise<void> {
    this.jobs.forEach(job => {
      const cronJob = new CronJob(job.time, () => job.execute());
      this.schedulerRegistry.addCronJob(job.name, cronJob);
      cronJob.start();
      console.log(`Started cron job ${job.name} (${job.time})`);
    });
  }

  private async stopJobs(): Promise<void> {
    this.jobs.forEach(job => {
      this.schedulerRegistry.getCronJob(job.name).stop();
      console.log(`Stopped cron job ${job.name}`);
    });
  }
}
