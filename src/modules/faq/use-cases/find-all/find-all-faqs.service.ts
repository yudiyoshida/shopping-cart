import { inject, injectable } from 'inversify';
import { IPaginationDto, PaginationService } from 'shared/helpers/pagination/pagination.service';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { IFaqRepository } from '../../repositories/faq-repository.interface';
import { FindAllFaqsOutputDto } from './dtos/find-all-faqs-output.dto';

@injectable()
export class FindAllFaqsService {
  constructor(
    @inject(TOKENS.IFaqRepository) private repository: IFaqRepository,
    @inject(PaginationService) private paginationService: PaginationService,
  ) {}

  public async execute(page?: number, size?: number, search?: string): Promise<IPaginationDto<FindAllFaqsOutputDto>> {
    // paginated or everything.
    const faqs = page && size
      ? await this.repository.findAllPaginated(page, size, search)
      : await this.repository.findAll(search);

    // faqs[0] is the array of faqs.
    // faqs[1] is the total count of faqs.
    faqs[0] = faqs[0].map(account => generateOutputDto(FindAllFaqsOutputDto, account));

    return this.paginationService.execute(faqs, page ?? 1, size ?? faqs[1]);
  }
}
