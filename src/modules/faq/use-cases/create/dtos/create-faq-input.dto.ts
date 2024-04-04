import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Faq } from 'modules/faq/entities/faq.entity';
import { Trim } from 'shared/validators/decorators/trim';

export class CreateFaqInputDto implements Omit<Faq, 'id'> {
  @Expose()
  @IsString({
    message: 'question deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'question é um campo obrigatório.',
  })
  @Trim()
  question!: string;

  @Expose()
  @IsString({
    message: 'answer deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'answer é um campo obrigatório.',
  })
  @Trim()
  answer!: string;
}
