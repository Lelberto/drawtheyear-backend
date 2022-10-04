export abstract class Job {

  public readonly name: string;
  public readonly time: string;

  public constructor(name: string, time: string) {
    this.name = name;
    this.time = time;
  }

  public abstract execute(): Promise<void>;
}
