import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { LoginInputDto } from './login-input.dto';

describe('LoginInputDto', () => {
  describe('credential field', () => {
    it('should throw an error about required field when not providing any value to credential', async() => {
      // Arrange
      const data = {};

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to credential', async() => {
      // Arrange
      const data = { credential: null };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to credential', async() => {
      // Arrange
      const data = { credential: 123 };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to credential', async() => {
      // Arrange
      const data = { credential: false };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to credential', async() => {
      // Arrange
      const data = { credential: {} };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to credential', async() => {
      // Arrange
      const data = { credential: [] };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to credential', async() => {
      // Arrange
      const data = { credential: 'random-credential' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(LoginInputDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/credential/)]));
      });
    });
  });

  describe('password field', () => {
    it('should throw an error about required field when not providing any value to password', async() => {
      // Arrange
      const data = {};

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to password', async() => {
      // Arrange
      const data = { password: null };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to password', async() => {
      // Arrange
      const data = { password: 123 };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to password', async() => {
      // Arrange
      const data = { password: false };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to password', async() => {
      // Arrange
      const data = { password: {} };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to password', async() => {
      // Arrange
      const data = { password: [] };

      // Act & Assert
      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('password deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to password', async() => {
      // Arrange
      const data = { password: 'random-password' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(LoginInputDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/password/)]));
      });
    });
  });

  describe('all fields together', () => {
    it('should pass all tests', async() => {
      // Arrange
      const credentials = createMock<LoginInputDto>({ credential: 'jhondoe@email.com', password: '123456' });

      // Act
      const result = await validateAndTransformDto(LoginInputDto, credentials);

      // Assert
      expect(result).toEqual({
        credential: credentials.credential.trim(),
        password: credentials.password,
      });
    });
  });
});
