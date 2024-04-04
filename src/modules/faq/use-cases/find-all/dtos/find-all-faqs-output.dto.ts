import { Expose } from 'class-transformer';
import { Faq } from 'modules/faq/entities/faq.entity';

export class FindAllFaqsOutputDto implements Faq {
  @Expose() id!: string;
  @Expose() question!: string;
  @Expose() answer!: string;
}
