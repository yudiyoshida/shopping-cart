import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { QueriesDto } from 'shared/dtos/queries/queries.dto';
import { container } from 'shared/ioc/inversify.config';
import { FindAllFaqsService } from './find-all-faqs.service';

export class FindAllFaqsController {
  @ValidateDto('query', QueriesDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(FindAllFaqsService);
    const { page, size, search } = req.query as QueriesDto;

    const result = await service.execute(page, size, search);
    res.status(200).json(result);
  }
}
