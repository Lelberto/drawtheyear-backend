import { EntityRepository, Repository } from 'typeorm';
import { Attachment } from './attachment.entity';

/**
 * Attachment repository
 */
@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {

  /**
   * Checks if attachment(s) exists
   * 
   * @param ids Attachment IDs
   * @returns True if the attachment(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Attachment['id'][]): Promise<boolean> {
    return await this.count({ id: { $in: ids } }) === ids.length;
  }
}