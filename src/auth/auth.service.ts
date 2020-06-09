import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) { }

  private readonly logger = new Logger(AuthService.name);

  async register(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };

    try {
      await this.usersService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }

    return status;
  }

  createToken(user) {
    const expiresIn = '60d';

    const accessToken = jwt.sign({ id: user.id,
      email: user.username,
      firstname: user.firstName,
      lastname: user.lastName },
      this.configService.get('secret'),
      { expiresIn }
    );

    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<IUser> {
    const user = await this.usersService.findOne(payload.id);

    return user.toResponseObject();
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);

    if (user && await user.comparePassword(password)) {
      this.logger.log('password check success');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, ...result} = user;
      return  result;
    }

    return null;
  }
}
