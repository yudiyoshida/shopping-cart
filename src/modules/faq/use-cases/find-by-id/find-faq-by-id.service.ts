import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { IFaqRepository } from '../../repositories/faq-repository.interface';
import { FindFaqByIdOutputDto } from './dtos/find-faq-by-id-output.dto';

@injectable()
export class FindFaqByIdService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(id: string): Promise<FindFaqByIdOutputDto> {
    const faq = await this.faqRepository.findById(id);

    if (!faq) {
      throw new AppException(404, Errors.FAQ_NOT_FOUND);
    }
    return generateOutputDto(FindFaqByIdOutputDto, faq);
  }
}
