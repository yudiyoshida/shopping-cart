import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindFaqByIdService } from './find-faq-by-id.service';

describe('FindFaqByIdService', () => {
  let sut: FindFaqByIdService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindFaqByIdService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mockRepository).toBeDefined();
  });

  it('should throw an error when cannot find faq', async() => {
    // Arrange
    const id = 'randomId';
    mockRepository.findById.mockResolvedValue(null);

    // Act & Assert
    expect.assertions(4);
    return sut.execute(id).catch(err => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(404);
      expect(err.error).toBe(Errors.FAQ_NOT_FOUND);

      expect(mockRepository.findById).toHaveBeenCalledWith(id);
    });
  });

  it('should return correct dto when find faq', async() => {
    // Arrange
    const id = 'randomId';
    const faq = createMock<Faq>();
    mockRepository.findById.mockResolvedValue(faq);

    // Act
    const result = await sut.execute(id);

    // Assert
    expect(result).toEqual({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
  });
});
