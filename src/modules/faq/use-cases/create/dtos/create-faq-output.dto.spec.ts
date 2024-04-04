import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { CreateFaqOutputDto } from './create-faq-output.dto';

describe('CreateFaqOutputDto', () => {
  it('should return only the id field', async() => {
    // Arrange
    const data = createMock<Faq>();

    // Act
    const result = generateOutputDto(CreateFaqOutputDto, data);

    // Assert
    expect(result).toEqual({ id: data.id });
  });
});
