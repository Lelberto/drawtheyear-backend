import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../../utils/types';

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
   * Validates an user by his email and password
   * 
   * @param email Email
   * @param password Password
   * @returns Validated user, or `null` if invalid
   */
  public async validateUser(email: User['email'], password: User['password']): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
    } catch (err) {}
    return null;
  }

  /**
   * Creates a new access token for the given user
   * 
   * @param user User for payload
   * @returns Access token
   */
  public async accessToken(user: User) {
    const payload: AccessTokenPayload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
