import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'The data of the user owner of the token used in this request.',
  })
  @ApiResponse({
    status: 401,
    description: 'The requester is unauthorized to make this request.',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
