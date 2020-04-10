import { IUser } from './user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUsersService {
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findOne(id: number): Promise<IUser | null>;
  register(user: CreateUserDto): Promise<IUser>;
  update(id: number, newUser: UpdateUserDto): Promise<IUser | null>;
  delete(id: number): Promise<void>;
}
