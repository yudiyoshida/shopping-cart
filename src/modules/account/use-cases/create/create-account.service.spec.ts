import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { HashingBcryptAdapterService } from 'infra/hashing/adapters/hashing-bcrypt.service';
import { Account } from 'modules/account/entities/account.entity';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { CreateAccountService } from './create-account.service';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';

describe('CreateAccountService', () => {
  let sut: CreateAccountService;
  let mockHashingService: jest.Mocked<HashingBcryptAdapterService>;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateAccountService).compile();

    sut = unit;
    mockHashingService = unitRef.get(TOKENS.IHashingService);
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should throw an error when the provided emails is already in use', async() => {
    // Arrange
    const account = createMock<Account>();
    const createAccountInputDto = createMock<CreateAccountInputDto>({ email: 'jhondoe@email.com' });
    mockRepository.findByEmail.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(6);
    return sut.execute(createAccountInputDto).catch(err => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(409);
      expect(err.error).toBe(Errors.DUPLICATE_EMAIL);

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(createAccountInputDto.email);
      expect(mockHashingService.hash).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  it('should hash the password before creating account', async() => {
    // Arrange
    const createAccountInputDto = createMock<CreateAccountInputDto>({ password: '123' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');
    mockRepository.save.mockResolvedValue(createMock<Account>());

    // Act
    await sut.execute(createAccountInputDto);

    // Assert
    expect(mockHashingService.hash).toHaveBeenCalledWith(createAccountInputDto.password);
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashPassword' }));
  });

  it('should create an account with status pending when the role is seller', async() => {
    // Arrange
    const createAccountInputDto = createMock<CreateAccountInputDto>({ role: 'seller' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');
    mockRepository.save.mockResolvedValue(createMock<Account>());

    // Act
    await sut.execute(createAccountInputDto);

    // Assert
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ status: 'pending' }));
  });

  it('should create an account with status active when the role is buyer', async() => {
    // Arrange
    const createAccountInputDto = createMock<CreateAccountInputDto>({ role: 'buyer' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');
    mockRepository.save.mockResolvedValue(createMock<Account>());

    // Act
    await sut.execute(createAccountInputDto);

    // Assert
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ status: 'active' }));
  });

  it('should return only the id of the created account', async() => {
    // Arrange
    const createAccountInputDto = createMock<CreateAccountInputDto>();
    const account = createMock<Account>({ id: 'acc-id' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');
    mockRepository.save.mockResolvedValue(account);

    // Act
    const result = await sut.execute(createAccountInputDto);

    // Assert
    expect(result).toEqual({ id: result.id });
  });
});
