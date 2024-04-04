import { inject, injectable } from 'inversify';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { IFaqRepository } from '../../repositories/faq-repository.interface';
import { CreateFaqInputDto } from './dtos/create-faq-input.dto';
import { CreateFaqOutputDto } from './dtos/create-faq-output.dto';

@injectable()
export class CreateFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(data: CreateFaqInputDto): Promise<CreateFaqOutputDto> {
    const faq = await this.faqRepository.create({
      answer: data.answer,
      question: data.question,
    });

    return generateOutputDto(CreateFaqOutputDto, faq);
  }
}
