import { ValidationArguments } from 'class-validator';
import * as moment from 'moment';
import { DATE_FORMAT, MIN_DATE } from '../constants/day.constants';

export function isDayDate(value: unknown, args: ValidationArguments) {
  const date = moment(value, DATE_FORMAT, true);
  const minDate = moment(MIN_DATE);
  const now = moment();
  return date.isValid() && date.isAfter(minDate) && date.isBefore(now);
}
