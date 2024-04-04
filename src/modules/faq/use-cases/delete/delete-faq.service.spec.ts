import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindFaqByIdService } from '../find-by-id/find-faq-by-id.service';
import { DeleteFaqService } from './delete-faq.service';

describe('DeleteFaqService', () => {
  let sut: DeleteFaqService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;
  let mockFindFaqByIdService: jest.Mocked<FindFaqByIdService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(DeleteFaqService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
    mockFindFaqByIdService = unitRef.get(FindFaqByIdService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mockRepository).toBeDefined();
  });

  it('should return success message', async() => {
    // Arrange
    const faq = createMock<Faq>();
    mockFindFaqByIdService.execute.mockResolvedValue(faq);

    // Act
    const result = await sut.execute('1');

    // Assert
    expect(result).toEqual({ message: 'FAQ deletada com sucesso.' });
    expect(mockFindFaqByIdService.execute).toHaveBeenCalledWith('1');
    expect(mockRepository.delete).toHaveBeenCalledWith(faq.id);
  });

});
