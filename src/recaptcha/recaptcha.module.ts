import { Module } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';

@Module({
  providers: [RecaptchaService]
})
export class RecaptchaModule {}
