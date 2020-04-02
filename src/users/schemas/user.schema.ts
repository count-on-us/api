import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  registerNumber: String,
  phone: String,
  password: String,
});
UserSchema.plugin(passportLocalMongoose);
