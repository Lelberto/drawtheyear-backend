import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `day-attachments`
 */
export class DayAttachmentsAction extends Action {

  private readonly dayDate: string;

  public constructor(dayDate: string) {
    super('day-attachments', Method.GET);
    this.dayDate = dayDate;
  }

  public buildHref(): string {
    return `/days/${this.dayDate}/attachments`;
  }
}
