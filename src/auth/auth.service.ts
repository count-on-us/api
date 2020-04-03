import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  private readonly logger = new Logger(AuthService.name);

  async register(user: IUser) {
    const status: RegistrationStatus = { success: true, message: 'user register' };

    return status;
  }

  createToken(user) {
    const expiresIn = 3600;

    const accessToken = jwt.sign({ id: user.id,
      email: user.username,
      firstname: user.firstName,
      lastname: user.lastName }, 'ILovePokemon', { expiresIn });

    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<IUser> {
    return await this.usersService.findOne(payload.id);
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.comparePassword(password)) {
      this.logger.log('password check success');
      return  user;
    }
    return null;
  }
}
