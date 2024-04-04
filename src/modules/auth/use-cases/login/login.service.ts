import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { IAuthenticationService } from 'infra/authentication/authentication-service.interface';
import { IHashingService } from 'infra/hashing/hashing-service.interface';
import { inject, injectable } from 'inversify';
import { FindAccountByEmailService } from 'modules/account/use-cases/find-by-email/find-account-by-email.service';
import { TOKENS } from 'shared/ioc/token';
import { generateOutputDto } from 'shared/utils/data-mapper/data-mapper';
import { LoginInputDto } from './dtos/login-input.dto';
import { LoginOutputDto } from './dtos/login-output.dto';

@injectable()
export class LoginService {
  constructor(
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
    @inject(TOKENS.IAuthenticationService) private jwtService: IAuthenticationService,
    @inject(FindAccountByEmailService) private findAccountByEmailService: FindAccountByEmailService,
  ) {}

  public async execute(data: LoginInputDto): Promise<LoginOutputDto> {
    const account = await this.findAccountByEmailService.execute(data.credential);
    if (!account) {
      throw new AppException(400, Errors.INVALID_CREDENTIALS);
    }

    const passwordIsCorrect = this.hashingService.compare(data.password, account.password);
    if (passwordIsCorrect) {
      const accessToken = this.jwtService.sign({ sub: account.id });

      return generateOutputDto(LoginOutputDto, { accessToken });
    }

    throw new AppException(400, Errors.INVALID_CREDENTIALS);
  }
}
