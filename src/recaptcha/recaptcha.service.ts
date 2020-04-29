import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRecaptchaApiResponse } from './interfaces/recaptcha-api-response.interface';

@Injectable()
export class RecaptchaService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async validateCapcha(responseToken: string): Promise<IRecaptchaApiResponse>
  {
    const response = await this.httpService.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        secret: this.configService.get('googleApiKey'),
        response: responseToken,
      }
    ).toPromise();

    console.log(response);

    return response.data;
  }
}
