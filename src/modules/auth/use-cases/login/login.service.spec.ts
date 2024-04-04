import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { AuthenticationJwtAdapterService } from 'infra/authentication/adapters/authentication-jwt.service';
import { HashingBcryptAdapterService } from 'infra/hashing/adapters/hashing-bcrypt.service';
import { Account } from 'modules/account/entities/account.entity';
import { FindAccountByEmailService } from 'modules/account/use-cases/find-by-email/find-account-by-email.service';
import { TOKENS } from 'shared/ioc/token';
import { LoginInputDto } from './dtos/login-input.dto';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let sut: LoginService;
  let mockFindAccountByEmailService: jest.Mocked<FindAccountByEmailService>;
  let mockHashingService: jest.Mocked<HashingBcryptAdapterService>;
  let mockAuthenticationService: jest.Mocked<AuthenticationJwtAdapterService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(LoginService).compile();

    sut = unit;
    mockFindAccountByEmailService = unitRef.get(FindAccountByEmailService);
    mockHashingService = unitRef.get(TOKENS.IHashingService);
    mockAuthenticationService = unitRef.get(TOKENS.IAuthenticationService);
  });

  it('should throw an error when cannot find account by credential', async() => {
    // Arrange
    const loginDto = createMock<LoginInputDto>({ credential: 'jhondoe@email.com' });
    mockFindAccountByEmailService.execute.mockResolvedValue(null);

    // Act & Assert
    expect.assertions(6);
    return sut.execute(loginDto).catch((err: any) => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(400);
      expect(err.error).toBe(Errors.INVALID_CREDENTIALS);

      expect(mockFindAccountByEmailService.execute).toHaveBeenCalledWith(loginDto.credential);
      expect(mockHashingService.compare).not.toHaveBeenCalled();
      expect(mockAuthenticationService.sign).not.toHaveBeenCalled();
    });
  });

  it('should throw an error when providing incorrect password', async() => {
    // Arrange
    const loginDto = createMock<LoginInputDto>({ password: '123456' });
    const account = createMock<Account>({ password: 'hashedPassword' });
    mockFindAccountByEmailService.execute.mockResolvedValue(account);
    mockHashingService.compare.mockReturnValue(false);

    // Act & Assert
    expect.assertions(6);
    return sut.execute(loginDto).catch((err: any) => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(400);
      expect(err.error).toBe(Errors.INVALID_CREDENTIALS);

      expect(mockFindAccountByEmailService.execute).toHaveBeenCalledOnce();
      expect(mockHashingService.compare).toHaveBeenCalledWith(loginDto.password, account.password);
      expect(mockAuthenticationService.sign).not.toHaveBeenCalled();
    });
  });

  it('should return an access token when providing correct credentials', async() => {
    // Arrange
    const loginDto = createMock<LoginInputDto>();
    const account = createMock<Account>({ id: 'acc-id' });
    mockFindAccountByEmailService.execute.mockResolvedValue(account);
    mockHashingService.compare.mockReturnValue(true);
    mockAuthenticationService.sign.mockReturnValue('token de acesso');

    // Act
    const result = await sut.execute(loginDto);

    // Assert
    expect(result).toEqual({ accessToken: 'token de acesso' });
    expect(mockFindAccountByEmailService.execute).toHaveBeenCalledOnce();
    expect(mockHashingService.compare).toHaveBeenCalledOnce();
    expect(mockAuthenticationService.sign).toHaveBeenCalledOnce();
  });
});
