import { inject, injectable } from 'inversify';
import { IPaginationDto, PaginationService } from 'shared/helpers/pagination/pagination.service';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { IAccountRepository } from '../../repositories/account-repository.interface';
import { FindAllAccountsOutputDto } from './dtos/find-all-accounts-output.dto';

@injectable()
export class FindAllAccountsService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(PaginationService) private paginationService: PaginationService,
  ) {}

  public async execute(page?: number, size?: number, search?: string): Promise<IPaginationDto<FindAllAccountsOutputDto>> {
    // paginated or everything.
    const accounts = page && size
      ? await this.repository.findAllPaginated(page, size, search)
      : await this.repository.findAll(search);

    // accounts[0] is the array of accounts.
    // accounts[1] is the total count of accounts.
    accounts[0] = accounts[0].map(account => generateOutputDto(FindAllAccountsOutputDto, account));

    return this.paginationService.execute(accounts, page ?? 1, size ?? accounts[1]);
  }
}
