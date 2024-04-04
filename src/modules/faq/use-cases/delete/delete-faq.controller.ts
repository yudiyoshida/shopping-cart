import { Request, Response } from 'express';
import { RequiredPermission } from 'shared/decorators/authentication.decorator';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { ParamsDto } from 'shared/dtos/params/params.dto';
import { PermissionEnum } from 'shared/guards/authentication.guard';
import { container } from 'shared/ioc/inversify.config';
import { DeleteFaqService } from './delete-faq.service';

export class DeleteFaqController {
  @RequiredPermission(PermissionEnum.TEST)
  @ValidateDto('params', ParamsDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(DeleteFaqService);

    const result = await service.execute(req.params.id);
    res.status(200).json(result);
  }
}
