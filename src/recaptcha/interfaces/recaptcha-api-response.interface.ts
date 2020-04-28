export interface IRecaptchaApiResponse {
  readonly success: boolean;
  readonly challenge_ts: string;
  readonly hostname: string;
  readonly errorCodes: Array<string>;
}
