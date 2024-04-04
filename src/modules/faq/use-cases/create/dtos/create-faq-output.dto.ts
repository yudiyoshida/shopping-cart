import { Expose } from 'class-transformer';
import { Faq } from 'modules/faq/entities/faq.entity';

export class CreateFaqOutputDto implements Pick<Faq, 'id'> {
  @Expose()
  id!: string;
}
