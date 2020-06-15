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
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolee is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolee is true to not crash
            delete: jest.fn().mockRejectedValue(true),
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
    it('should return one user by email', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');

      expect(service.findByEmail('email@test.com')).resolves.toEqual(oneUser);

      expect(repoSpy).toBeCalledWith({email: 'email@test.com'});
    });
  });

  describe('findOne', () => {
    it('should return one user by id', () => {
      expect(service.findOne(42)).resolves.toEqual(oneUser);

      expect(repo.findOne).toBeCalledWith(42);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete(42)).resolves.toEqual({ deleted: true });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));

      expect(service.delete(17)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });

      expect(repoSpy).toBeCalledWith(17);

      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('register', () => {
    it('should register one new user', async () => {
      const testUser = {
        email: oneUser.email,
        licenseNumber: oneUser.licenseNumber,
        name: oneUser.name,
        password: oneUser.password,
        phone: oneUser.phone,
        profession: oneUser.profession,
        recaptcha: 'long token',
      };

      jest.spyOn(repo, 'findOne')
        .mockResolvedValueOnce(null);

      await expect(service.register(testUser))
        .resolves
        .toEqual(oneUser);

      expect(repo.findOne).toBeCalledTimes(1);

      expect(repo.create).toBeCalledTimes(1);

      expect(repo.create).toBeCalledWith(testUser);

      expect(repo.save).toBeCalledTimes(1);

      expect(repo.save).toBeCalledWith(oneUser);
    });
  });
});
