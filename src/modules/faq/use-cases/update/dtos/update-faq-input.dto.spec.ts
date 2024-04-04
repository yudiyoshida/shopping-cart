import { createMock } from '@golevelup/ts-jest';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { UpdateFaqInputDto } from './update-faq-input.dto';

describe('UpdateFaqInputDto', () => {
  describe('question field', () => {
    it('should throw an error about required field when not providing any question', async() => {
      // Arrange
      const data = {};

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to question', async() => {
      // Arrange
      const data = { question: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to question', async() => {
      // Arrange
      const data = { question: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to question', async() => {
      // Arrange
      const data = { question: 123 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to question', async() => {
      // Arrange
      const data = { question: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to question', async() => {
      // Arrange
      const data = { question: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to question', async() => {
      // Arrange
      const data = { question: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to question', async() => {
      // Arrange
      const data = { question: ' foo ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/question/)]));
      });
    });
  });

  describe('answer field', () => {
    it('should throw an error about required field when not providing any answer', async() => {
      // Arrange
      const data = {};

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to answer', async() => {
      // Arrange
      const data = { answer: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to answer', async() => {
      // Arrange
      const data = { answer: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to answer', async() => {
      // Arrange
      const data = { answer: 123 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to answer', async() => {
      // Arrange
      const data = { answer: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to answer', async() => {
      // Arrange
      const data = { answer: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to answer', async() => {
      // Arrange
      const data = { answer: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to answer', async() => {
      // Arrange
      const data = { answer: ' foo ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(UpdateFaqInputDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/answer/)]));
      });
    });
  });

  describe('all fields together', () => {
    it('should pass all tests', async() => {
      // Arrange
      const data = createMock<UpdateFaqInputDto>({ question: ' foo ', answer: ' bar ' });

      // Act
      const result = await validateAndTransformDto(UpdateFaqInputDto, data);

      // Assert
      expect(result).toEqual({
        question: data.question.trim(),
        answer: data.answer.trim(),
      });
    });
  });
});
