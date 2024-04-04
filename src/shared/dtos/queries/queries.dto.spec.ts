import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { QueriesDto } from './queries.dto';

describe('QueriesDto', () => {
  describe('page field', () => {
    it('should not throw an error when not providing any page', async() => {
      // Arrange
      const data = { size: 'invalid' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should not throw an error when providing null to page', async() => {
      // Arrange
      const data = { size: 'invalid', page: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should throw an error about invalid type when providing empty spaces to page', async() => {
      // Arrange
      const data = { page: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a string to page', async() => {
      // Arrange
      const data = { page: ' foo ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to page', async() => {
      // Arrange
      const data = { page: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an object to page', async() => {
      // Arrange
      const data = { page: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an array to page', async() => {
      // Arrange
      const data = { page: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing a decimal number to page', async() => {
      // Arrange
      const data = { page: 1.4 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing zero to page', async() => {
      // Arrange
      const data = { page: 0 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing negative number to page', async() => {
      // Arrange
      const data = { page: -1 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should not throw an error when providing a int number to page (string)', async() => {
      // Arrange
      const data = { size: 'invalid', page: '399' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should not throw an error when providing a int number to page (number)', async() => {
      // Arrange
      const data = { size: 'invalid', page: 399 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });
  });

  describe('size field', () => {
    it('should not throw an error when not providing any size', async() => {
      // Arrange
      const data = { page: 'invalid' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should not throw an error when providing null to size', async() => {
      // Arrange
      const data = { page: 'invalid', size: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should throw an error about invalid type when providing empty spaces to size', async() => {
      // Arrange
      const data = { size: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a string to size', async() => {
      // Arrange
      const data = { size: ' foo ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to size', async() => {
      // Arrange
      const data = { size: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an object to size', async() => {
      // Arrange
      const data = { size: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an array to size', async() => {
      // Arrange
      const data = { size: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing a decimal number to size', async() => {
      // Arrange
      const data = { size: 1.4 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing zero to size', async() => {
      // Arrange
      const data = { size: 0 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing negative number to size', async() => {
      // Arrange
      const data = { size: -1 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should not throw an error when providing a int number to size (string)', async() => {
      // Arrange
      const data = { page: 'invalid', size: '399' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should not throw an error when providing a int number to size (number)', async() => {
      // Arrange
      const data = { page: 'invalid', size: 399 };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });
  });

  describe('search field', () => {
    it('should not throw an error when not providing any search', async() => {
      // Arrange
      const data = { page: 'invalid' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing null to search', async() => {
      // Arrange
      const data = { page: 'invalid', search: null };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing empty spaces to search', async() => {
      // Arrange
      const data = { page: 'invalid', search: '  ' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing a string to search', async() => {
      // Arrange
      const data = { page: 'invalid', search: 'foo' };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should throw an error about invalid type when providing a boolean to search', async() => {
      // Arrange
      const data = { search: true };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to search', async() => {
      // Arrange
      const data = { search: {} };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to search', async() => {
      // Arrange
      const data = { search: [] };

      // Act & Assert
      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });
  });

  describe('all fields together', () => {
    it('should pass all tests and apply transformations', async() => {
      // Arrange
      const data = { page: '7', size: '10', search: ' foo bar ' };

      // Act
      const result = await validateAndTransformDto(QueriesDto, data);

      // Assert
      expect(result).toEqual({
        page: +data.page,
        size: +data.size,
        search: data.search.trim(),
      });
    });
  });
});
