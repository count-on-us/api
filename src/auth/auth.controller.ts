import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { RecaptchaService } from '../recaptcha/recaptcha.service';

@Controller('auth')
@ApiTags('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private recaptchaService: RecaptchaService
  ) {}

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description: 'There are some validations errors.',
  })
  public async register(@Response() res, @Body() user: CreateUserDto){
    const recaptchaResponse = await this.recaptchaService.validateCapcha(user.recaptcha);

    if (!recaptchaResponse.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(recaptchaResponse.errorCodes);
    }

    const result = await this.authService.register(user);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The token was successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Authorization error.',
  })
  public async login(@Request() req, @Response() res, @Body() login: LoginUserDto){
    return await this.usersService.findByEmail(login.email).then(user => {
      if (!user) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'User Not Found',
        });
      } else {
        const token = this.authService.createToken(user);
        return res.status(HttpStatus.OK).json(token);
      }
    });
  }
}
