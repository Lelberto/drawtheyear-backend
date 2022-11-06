import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray } from 'lodash';
import { map, Observable } from 'rxjs';
import { Day } from '../entities/day.entity';

@Injectable()
export class SortEmotionsInterceptor implements NestInterceptor {

  public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    return next.handle().pipe(map(({ data }) => {
      if (isArray(data)) {
        data.forEach((day: Day) => {
          day.emotions = day.emotions.sort((a, b) => {
            const orderingA = day.dayEmotions.find(dayEmotion => dayEmotion.emotionId === a.id).ordering;
            const orderingB = day.dayEmotions.find(dayEmotion => dayEmotion.emotionId === b.id).ordering;
            return orderingA - orderingB;
          });
        })
      } else {
        const day = data as Day;
        day.emotions = day.emotions.sort((a, b) => {
          const orderingA = day.dayEmotions.find(dayEmotion => dayEmotion.emotionId === a.id).ordering;
          const orderingB = day.dayEmotions.find(dayEmotion => dayEmotion.emotionId === b.id).ordering;
          return orderingA - orderingB;
        });
      }
      return { data };
    }));
  }
}
