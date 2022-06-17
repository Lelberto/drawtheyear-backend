import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersAction } from '../hateoas/actions/users.action';
import { HateoasService } from '../hateoas/hateoas.service';

/**
 * Application controller
 * 
 * Path: `/`
 */
@Controller()
export class AppController {

  private readonly hateoas: HateoasService;

  public constructor(hateoas: HateoasService) {
    this.hateoas = hateoas;
  }

  @Get()
  public entryPoint(@Req() req: Request) {
    const _links = this.hateoas.createActionBuilder(req)
      .add(new UsersAction())
      .build();
    return { _links }
  }
}