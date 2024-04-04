import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'shared/validators/decorators/trim';

export class ParamsDto {
  @Expose()
  @IsString({
    message: 'id deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'id é um campo obrigatório.',
  })
  @IsMongoId({
    message: 'id inválido.',
  })
  @Trim()
  id!: string;
}
