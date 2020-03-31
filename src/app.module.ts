import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoURI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
