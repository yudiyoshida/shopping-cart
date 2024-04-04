import { Request, Response } from 'express';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { ParamsDto } from 'shared/dtos/params/params.dto';
import { container } from 'shared/ioc/inversify.config';
import { FindFaqByIdService } from './find-faq-by-id.service';

export class FindFaqByIdController {
  @ValidateDto('params', ParamsDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(FindFaqByIdService);

    const result = await service.execute(req.params.id);
    res.status(200).json(result);
  }
}
