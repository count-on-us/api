import * as passportLocalMongoose from 'passport-local-mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: 'User',
      useFactory: () => {
        const schema = UserSchema;

        schema.plugin(passportLocalMongoose);

        return schema;
      }
    }
  ])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule.forFeatureAsync([
    {
      name: 'User',
      useFactory: () => {
        const schema = UserSchema;

        schema.plugin(passportLocalMongoose);

        return schema;
      },
    },
  ])],
  controllers: [UsersController],
})
export class UsersModule {}
