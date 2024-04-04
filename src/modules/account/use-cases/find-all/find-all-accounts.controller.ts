import { Request, Response } from 'express';
import { RequiredPermission } from 'shared/decorators/authentication.decorator';
import { ValidateDto } from 'shared/decorators/validation.decorator';
import { QueriesDto } from 'shared/dtos/queries/queries.dto';
import { PermissionEnum } from 'shared/guards/authentication.guard';
import { container } from 'shared/ioc/inversify.config';
import { FindAllAccountsService } from './find-all-accounts.service';

export class FindAllAccountsController {
  @RequiredPermission(PermissionEnum.TEST)
  @ValidateDto('query', QueriesDto)
  public async handle(req: Request, res: Response): Promise<void> {
    const service = container.resolve(FindAllAccountsService);
    const { page, size, search } = req.query as QueriesDto;

    const result = await service.execute(page, size, search);
    res.status(200).json(result);
  }
}
