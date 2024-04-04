import { createMock } from '@golevelup/ts-jest';
import { Account } from 'modules/account/entities/account.entity';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { CreateAccountOutputDto } from './create-account-output.dto';

describe('CreateAccountOutputDto', () => {
  it('should return only the id field', () => {
    // Arrange
    const account = createMock<Account>();

    // Act
    const result = generateOutputDto(CreateAccountOutputDto, account);

    // Assert
    expect(result).toEqual({ id: account.id });
  });
});
