import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `day-emotions`
 */
export class DayEmotionsAction extends Action {

  private readonly username: string;
  private readonly dayDate: string;

  public constructor(username: string, dayDate: string) {
    super('day-emotions', Method.GET);
    this.username = username;
    this.dayDate = dayDate;
  }

  public buildHref(): string {
    return `/users/${this.username}/days/${this.dayDate}/emotions`;
  }
}
