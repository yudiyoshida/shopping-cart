import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { FindFaqByIdOutputDto } from './find-faq-by-id-output.dto';

describe('FindFaqByIdOutputDto', () => {
  it('should return correct dto', async() => {
    // Arrange
    const faq = createMock<Faq>();

    // Act
    const result = generateOutputDto(FindFaqByIdOutputDto, faq);

    // Assert
    expect(result).toEqual({
      id: faq.id,
      answer: faq.answer,
      question: faq.question,
    });
  });
});
