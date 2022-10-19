import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray } from 'lodash';
import { map, Observable } from 'rxjs';
import { Permission } from '../../../common/types/role.types';
import { extractAuthUserFromRequest } from '../../../common/utils/utils';
import { RoleService } from '../../auth/role.service';
import { User } from '../../users/entities/user.entity';
import { Day } from '../entities/day.entity';
import { Visibility } from '../entities/visibility.enum';

@Injectable()
export class DayDetailsInterceptor implements NestInterceptor {

  public readonly roleService: RoleService;

  public constructor(roleService: RoleService) {
    this.roleService= roleService;
  }
 
  public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const authUser = extractAuthUserFromRequest(context.switchToHttp().getRequest());
    console.log(authUser)
    return next.handle().pipe(map(async ({ data }) => {
      if (isArray(data)) {
        for (const day of data) {
          if (!await this.hasAccessToDetails(authUser, day)) {
            this.hideDetails(day);
          }
        }
      } else {
        console.log('not array')
        if (!await this.hasAccessToDetails(authUser, data)) {
          this.hideDetails(data);
        }
      }
      return { data };
    }));
  }

  private async hasAccessToDetails(user: User, day: Day): Promise<boolean> {
    return day.visibility === Visibility.PUBLIC
      || this.roleService.checkPermissions(user, Permission.DAY_RESUME_BYPASS);
  }

  private hideDetails(day: Day): void {
    day.resume = null;
  }
}
