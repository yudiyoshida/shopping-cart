import { TestBed } from '@automock/jest';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindAccountByEmailService } from './find-account-by-email.service';

describe('FindAccountByEmailService', () => {
  let sut: FindAccountByEmailService;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindAccountByEmailService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should call the repository with correct arguments', async() => {
    // Arrange
    const email = 'jhondoe@email.com';

    // Act
    await sut.execute(email);

    // Assert
    expect(mockRepository.findByEmail).toHaveBeenCalledExactlyOnceWith(email);
  });
});
