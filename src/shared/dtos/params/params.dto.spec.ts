import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { ParamsDto } from './params.dto';

describe('ParamsDto', () => {
  describe('id field', () => {
    it('should throw an error about required field when not providing any id', async() => {
      // Arrange
      const data = {};

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to id', async() => {
      // Arrange
      const data = { id: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to id', async() => {
      // Arrange
      const data = { id: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to id', async() => {
      // Arrange
      const data = { id: 123 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to id', async() => {
      // Arrange
      const data = { id: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to id', async() => {
      // Arrange
      const data = { id: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to id', async() => {
      // Arrange
      const data = { id: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error when providing invalid id', async() => {
      // Arrange
      const data = { id: 'not-mongo-id' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id inválido.');
      });
    });

    it('should not throw an error when providing a valid id', async() => {
      // Arrange
      const data = { id: ' 660cc802d536103e57be465a ' };

      // Act
      const result = await validateAndTransformDto(ParamsDto, data);

      // Assert
      expect(result).toEqual({ id: data.id.trim() });
    });
  });
});
