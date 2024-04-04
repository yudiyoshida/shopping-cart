import { Expose } from 'class-transformer';
import { Faq } from 'modules/faq/entities/faq.entity';

export class FindFaqByIdOutputDto implements Faq {
  @Expose() id!: string;
  @Expose() answer!: string;
  @Expose() question!: string;
}
