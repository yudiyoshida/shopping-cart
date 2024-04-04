import { Expose } from 'class-transformer';
import { Trim } from './decorators/trim';
import { transformDto } from './transform-dto';

class UserTest {
  @Expose()
  @Trim()
  name!: string;

  @Expose()
  age!: number;
}

const plainUser = {
  name: '  Jhon Doe  ',
  age: '30',
  nationality: 'japanese',
};

describe('transformDto', () => {
  it('should transform a plain object to a instance of a class', () => {
    // Act
    const result = transformDto(UserTest, plainUser);

    // Assert
    expect(result).toBeInstanceOf(UserTest);
    expect(result.name).toBe(plainUser.name.trim());
    expect(result.age).toBe(plainUser.age);
  });

  it('should not make implicit transformations', () => {
    // Act
    const result = transformDto(UserTest, plainUser);

    // Assert
    expect(result.name).toBe('Jhon Doe');
    expect(result.age).toBe('30');
    expect(result.age).not.toBe(30);
  });

  it('should remove extra fields', () => {
    // Act
    const result = transformDto(UserTest, plainUser);

    // Assert
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
    expect(result).not.toHaveProperty('nationality');
  });
});
