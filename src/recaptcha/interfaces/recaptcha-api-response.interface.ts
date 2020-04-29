export interface IRecaptchaApiResponse {
  readonly success: boolean;
  readonly challengeTs: string;
  readonly hostname: string;
  readonly errorCodes: Array<string>;
}
