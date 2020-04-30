import { Module, HttpModule } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';

@Module({
  imports: [HttpModule],
  providers: [RecaptchaService],
  exports: [RecaptchaService],
})
export class RecaptchaModule {}
