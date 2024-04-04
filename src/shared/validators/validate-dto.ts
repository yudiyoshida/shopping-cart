import { ValidationError, ValidatorOptions, validate } from 'class-validator';

const options: ValidatorOptions = {
  whitelist: true,
};

export async function validateDto(dto: any): Promise<string[]> {
  let messages: string[] = [];

  (await validate(dto, options)).forEach((error) => {
    messages = messages.concat(getErrorMessages(error));
  });

  return messages;
}

function getErrorMessages(errors: ValidationError): string[] {
  if (errors.constraints) {
    return Object.values(errors.constraints);

  } else if (errors.children) {
    const messages: string[] = [];

    for (const child of errors.children) {
      messages.push(...getErrorMessages(child));
    }
    return messages;
  }
  return [];
}
