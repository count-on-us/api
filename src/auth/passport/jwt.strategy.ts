import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ILovePokemon',
    });
  }

  // tslint:disable-next-line:ban-types
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserToken(payload);

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
