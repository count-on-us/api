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
];

const oneUser = new User(
  'test3@test.com',
  '123456',
  'Test User 3',
  'Psicólogo',
  '123456/BA',
  '74999999999'
);

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(usersArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();

      expect(users).toEqual(usersArray);
    });
  });

  describe('findByEmail', () => {
    it('should return one user', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');

      expect(service.findByEmail('email@test.com')).resolves.toEqual(oneUser);

      expect(repoSpy).toBeCalledWith({email: 'email@test.com'});
    })
  });
});
