import { Emotion } from '../emotions/emotion.entity';
import { User } from '../users/user.entity';

/**
 * HATEOAS link
 */
export type Link = {
  rel: Rel;
  method: Method;
  href: string;
}

/**
 * HTTP methods
 */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * HATEOAS rel parameters
 */
export type RelParams = {
  'user-self': { userId: User['id'] };
  'user-emotions': { userId: User['id'] };
  'user-days': { userId: User['id'] };
  'emotion-self': { emotionId: Emotion['id'] };
}

/**
 * HATEOAS rel
 */
export type Rel = keyof RelParams;
