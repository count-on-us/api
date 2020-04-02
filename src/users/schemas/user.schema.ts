import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  registerNumber: String,
  phone: String,
  password: String,
});
