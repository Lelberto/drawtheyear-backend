import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `attachment-self`
 */
export class AttachmentSelfAction extends Action {

  private readonly attachmentId: string;

  public constructor(attachmentId: string) {
    super('attachment-self', Method.GET);
    this.attachmentId = attachmentId;
  }

  public buildHref(): string {
    return `/attachments/${this.attachmentId}`;
  }
}
