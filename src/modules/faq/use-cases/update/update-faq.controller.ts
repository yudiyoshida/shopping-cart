import { Request, Response } from 'express';
import { RequiredPermission } from 'shared/decorators/authentication.decorator';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { ParamsDto } from 'shared/dtos/params/params.dto';
import { PermissionEnum } from 'shared/guards/authentication.guard';
import { container } from 'shared/ioc/inversify.config';
import { UpdateFaqInputDto } from './dtos/update-faq-input.dto';
import { UpdateFaqService } from './update-faq.service';

export class UpdateFaqController {
  @RequiredPermission(PermissionEnum.TEST)
  @ValidateDto('params', ParamsDto)
  @ValidateDto('body', UpdateFaqInputDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(UpdateFaqService);

    const result = await service.execute(req.params.id, req.body);
    res.status(200).json(result);
  }
}
