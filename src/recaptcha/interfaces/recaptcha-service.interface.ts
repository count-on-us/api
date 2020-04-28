import { IRecaptchaApiResponse } from './recaptcha-api-response.interface';

export interface IRecaptchaService {
  validateCaptcha(responseToken: string): Promise<IRecaptchaApiResponse>;
}
