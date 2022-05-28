import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `emotion-self`
 */
export class EmotionSelfAction extends Action {

  private readonly emotionId: string;

  public constructor(emotionId: string) {
    super('emotion-self', Method.GET);
    this.emotionId = emotionId;
  }

  public buildHref(): string {
    return `/emotions/${this.emotionId}`;
  }
}
