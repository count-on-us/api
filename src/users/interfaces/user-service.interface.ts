import { IUser } from './user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUsersService {
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findOne(id: string): Promise<IUser | null>;
  register(user: CreateUserDto): Promise<IUser>;
  update(id: string, newUser: UpdateUserDto): Promise<IUser | null>;
  delete(id: string): Promise<void>;
}
