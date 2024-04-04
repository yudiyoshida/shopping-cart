import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { FindAllFaqsOutputDto } from './find-all-faqs-output.dto';

describe('FindAllFaqsOutputDto', () => {
  it('should return corrcet dto', async() => {
    // Arrange
    const data = createMock<Faq>();

    // Act
    const result = generateOutputDto(FindAllFaqsOutputDto, data);

    // Assert
    expect(result).toEqual({
      id: data.id,
      question: data.question,
      answer: data.answer,
    });
  });
});
