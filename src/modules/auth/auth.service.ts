import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  
  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getUserFromGoogle(profile: Profile) {
    const { id, emails, displayName } = profile;
    if (await this.userService.exists({ googleId: id })) {
      return await this.userService.findByGoogleId(id);
    }
    return await this.userService.create({ googleId: id, email: emails[0].value, username: displayName });
  }
}
