import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../../utils/types';
import { Profile } from 'passport-google-oauth20';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {

  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  public constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  /**
   * Creates a new access token for the given user
   * 
   * @param user User for payload
   * @returns Access token
   */
  public async accessToken(user: User) {
    const payload: AccessTokenPayload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  /**
   * Creates an user from a google profile
   * 
   * @param profile Google profile
   * @returns Created user
   */
  public async getUserFromGoogle(profile: Profile) {
    const { emails, displayName } = profile;
    try {
      return await this.userService.findByGoogleId(profile.id);
    } catch (err) {
      return await this.userService.create({
        googleId: profile.id,
        email: emails[0].value,
        name: displayName
      });
    }
  }
}
