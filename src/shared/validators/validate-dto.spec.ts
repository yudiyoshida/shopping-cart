import { IsEmail, IsStrongPassword } from 'class-validator';
import { validateDto } from './validate-dto';

class SignupTest {
  nickname!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

describe('validateDto', () => {
  it('should return an array of errors', async() => {
    // Arrange
    const signup = new SignupTest();
    signup.email = 'invalid@@email.com',
    signup.password = 'qwerty';

    // Act
    const result = await validateDto(signup);

    // Assert
    expect(result.length).toBeGreaterThan(0);
  });

  it('should remove fields that do not have decorators', async() => {
    // Arrange
    // providing invalid data to nickname, but no error will be throw since nickname does not have decorators.
    const signup = new SignupTest();
    signup.email = 'valid@email.com',
    signup.password = '1XVjQupy2_sBtK';
    signup.nickname = (true as unknown as string);

    // Act
    const result = await validateDto(signup);

    // Assert
    expect(result).toHaveLength(0);
  });

  it.todo('should test recursive funcion with children errors');
});
