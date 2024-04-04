import { AppException } from 'errors/app-exception';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { CreateAccountInputDto } from './create-account-input.dto';

describe('CreateAccountInputDto', () => {
  describe('name field', () => {
    it('should throw an error about required field when not providing any value to name', async() => {
      const data = {};

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to name', async() => {
      const data = { name: null };

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to name', async() => {
      const data = { name: 123 };

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to name', async() => {
      const data = { name: true };

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to name', async() => {
      const data = { name: {} };

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to name', async() => {
      const data = { name: [] };

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name deve ser do tipo string.');
      });
    });
  });

  it.todo('create tests for role field');
  it.todo('create tests for email field');
  it.todo('create tests for password field');
});
