import { inject, injectable } from 'inversify';
import { ISuccessMessage } from 'shared/interfaces/success-message.interface';
import { TOKENS } from 'shared/ioc/token';
import { IFaqRepository } from '../../repositories/faq-repository.interface';
import { FindFaqByIdService } from '../find-by-id/find-faq-by-id.service';

@injectable()
export class DeleteFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private repository: IFaqRepository,
    @inject(FindFaqByIdService) private findFaqByIdService: FindFaqByIdService,
  ) {}

  public async execute(id: string): Promise<ISuccessMessage> {
    const faq = await this.findFaqByIdService.execute(id);

    await this.repository.delete(faq.id);

    return { message: 'FAQ deletada com sucesso.' };
  }
}
