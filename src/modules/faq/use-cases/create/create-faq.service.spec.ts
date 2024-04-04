import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqInputDto } from './dtos/create-faq-input.dto';

describe('CreateFaqService', () => {
  let sut: CreateFaqService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateFaqService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mockRepository).toBeDefined();
  });

  it('should call the repository with correct arguments', async() => {
    // Arrange
    const data = createMock<CreateFaqInputDto>();

    // Act
    await sut.execute(data);

    // Assert
    expect(mockRepository.create).toHaveBeenCalledWith(data);
  });

  it('should return the id of the created faq', async() => {
    // Arrange
    const faq = createMock<Faq>();
    const data = createMock<CreateFaqInputDto>();
    mockRepository.create.mockResolvedValue(faq);

    // Act
    const result = await sut.execute(data);

    // Assert
    expect(result).toEqual({ id: faq.id });
  });
});
