import { TestBed } from '@automock/jest';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindAllFaqsService } from './find-all-faqs.service';

// TODO: testes.
describe('FindAllFaqsService', () => {
  let sut: FindAllFaqsService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindAllFaqsService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mockRepository).toBeDefined();
  });
});
