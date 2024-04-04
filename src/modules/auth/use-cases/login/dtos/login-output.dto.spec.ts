import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { LoginOutputDto } from './login-output.dto';

describe('LoginOutputDto', () => {
  it('should return only the accessToken', () => {
    // Arrange
    const data = { accessToken: 'random-access-token', anotherField: 'another-field' };

    // Act
    const result = generateOutputDto(LoginOutputDto, data);

    // Assert
    expect(result).toEqual({ accessToken: data.accessToken });
  });
});
