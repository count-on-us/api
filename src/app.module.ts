import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { User } from './users/user.entity';
import { ParticipantsModule } from './participants/participants.module';
import { Participant } from './participants/participant.entity';
import { RecaptchaModule } from './recaptcha/recaptcha.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [User, Participant],
      }),
      inject: [ConfigService],
    }),
    ParticipantsModule,
    RecaptchaModule
  ],
  controllers: [AppController],
})
export class AppModule {}
