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
    const response = await this.httpService.get(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        params: {
          secret: this.configService.get('googleApiKey'),
          response: responseToken,
        },
      }
    ).toPromise();

    const recaptchaResponse = {
      success: response.data.success,
      challengeTs: response.data.challenge_ts,
      hostname: response.data.hostname,
      errorCodes: response.data['error-codes'],
    };

    return recaptchaResponse;
  }
}
