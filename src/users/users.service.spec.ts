import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

const usersArray = [
  new User(
    'test1@test.com',
    '123456',
    'Test User 1',
    'Psicólogo',
    '123456/BA',
    '74999999999'
  ),
  new User(
    'test2@test.com',
    '123456',
    'Test User 2',
    'Psicólogo',
    '123456/BA',
    '74999999999'
  )
]

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
