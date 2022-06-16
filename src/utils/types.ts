import { User } from '../modules/users/entities/user.entity';

/** Constructor type */
export type Constructor<T> = { new(): T };

/** Access token payload */
export type AccessTokenPayload = { sub: User['id'], email: User['email'] };

/** Refresh token payload */
export type RefreshTokenPayload = { sub: User['id'], email: User['email'] };

/** Error response returned when an exception occurs */
export type ErrorResponse = {
  message: string;
  from: string;
}
