import { registerDecorator, ValidationOptions } from 'class-validator';
import moment from 'moment';

/**
 * Decorator for specific date checking (YYYY-MM-DD)
 * 
 * This decorator is used for class validation like DTOs.
 * 
 * The value must be a string with the correct date format, and the date must exist.
 * 
 * @param validationOptions Validation options
 * @returns Decorator
 */
export function IsSpecificDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsSpecificDate',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Invalid date',
        ...validationOptions
      },
      validator: {
        validate(value: any) {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return typeof value === 'string' && regex.test(value) && moment(value, 'YYYY-MM-DD').isValid();
        }
      }
    });
  }
}
