import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUsersService } from './interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findByEmail(userEmail: string): Promise<User> {
    return await this.usersRepository.findOne({ email: userEmail });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'This email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }

  async update(id: number, userDto: UpdateUserDto): Promise<User> {
    const { email } = userDto;
    let user = await this.usersRepository.findOne({ where: { email } });
    if (user.id !== id) {
      throw new HttpException(
        'This email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }
}
