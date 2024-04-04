import { inject, injectable } from 'inversify';
import { ISuccessMessage } from 'shared/interfaces/success-message.interface';
import { TOKENS } from 'shared/ioc/token';
import { IFaqRepository } from '../../repositories/faq-repository.interface';
import { FindFaqByIdService } from '../find-by-id/find-faq-by-id.service';
import { UpdateFaqInputDto } from './dtos/update-faq-input.dto';

@injectable()
export class UpdateFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private repository: IFaqRepository,
    @inject(FindFaqByIdService) private findFaqByIdService: FindFaqByIdService,
  ) {}

  public async execute(id: string, data: UpdateFaqInputDto): Promise<ISuccessMessage> {
    const faq = await this.findFaqByIdService.execute(id);

    await this.repository.update(faq.id, data);

    return { message: 'FAQ atualizada com sucesso.' };
  }
}
