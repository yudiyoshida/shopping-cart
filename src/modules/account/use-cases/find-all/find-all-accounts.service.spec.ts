import { TestBed } from '@automock/jest';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindAllAccountsService } from './find-all-accounts.service';

// TODO: testes.
describe('FindAllAccountsService', () => {
  let sut: FindAllAccountsService;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindAllAccountsService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mockRepository).toBeDefined();
  });
});
