import { isString, ValidationArguments } from 'class-validator';

export function isUsername(value: unknown, args: ValidationArguments) {
  return isString(value) && /^[a-z0-9]*$/.test(value);
}
