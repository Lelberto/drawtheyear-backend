import { isString, ValidationArguments } from 'class-validator';

export function isColor(value: unknown, args: ValidationArguments) {
  return isString(value) && /^#([0-9a-f]{3}){1,2}$/i.test(value)
}
