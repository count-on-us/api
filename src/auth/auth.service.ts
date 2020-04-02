import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

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

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOne(payload.id);
  }
}
