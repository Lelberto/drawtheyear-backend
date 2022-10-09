import { Request } from 'express';
import { User } from '../../modules/users/entities/user.entity';

export function parseBoolean(value: string | number): boolean {
  switch (typeof value) {
    case 'string': return value === 'true';
    case 'number': return value === 1;
    default: throw new Error(`Could not parse ${value} to boolean`);
  }
}

export function extractAuthUserFromRequest(req: Request): User {
  return req.user as User;
}
