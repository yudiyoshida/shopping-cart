import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { IHashingService } from 'infra/hashing/hashing-service.interface';
import { inject, injectable } from 'inversify';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';
import { CreateAccountOutputDto } from './dtos/create-account-output.dto';

@injectable()
export class CreateAccountService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
  ) {}

  public async execute(data: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    // unique fields.
    const emailIsAlreadyInUse = await this.repository.findByEmail(data.email);
    if (emailIsAlreadyInUse) {
      throw new AppException(409, Errors.DUPLICATE_EMAIL);
    }

    // default values.
    const status = (data.role === 'seller') ? 'pending' : 'active';
    const hashedPassword = this.hashingService.hash(data.password);

    // call repository.
    const account = await this.repository.save({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role,
      status,
    });

    // return output dto.
    return generateOutputDto(CreateAccountOutputDto, account);
  }
}
