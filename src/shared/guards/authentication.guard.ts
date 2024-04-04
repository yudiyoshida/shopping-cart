import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { IAuthenticationService } from 'infra/authentication/authentication-service.interface';
import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { AccountRole } from 'modules/account/types/account-role.type';
import { IPayload } from 'modules/auth/interfaces/payload.interface';
import { TOKENS } from 'shared/ioc/token';

export enum PermissionEnum {
  TEST = 'TEST',
}

// Aqui é possível adicionar as permissões de cada role.
const ROLE_PERMISSION: Record<AccountRole, PermissionEnum[]> = {
  admin: [
    PermissionEnum.TEST,
  ],
  buyer: [
    PermissionEnum.TEST,
  ],
  seller: [
    PermissionEnum.TEST,
  ],
};

// TODO: testes.
@injectable()
export class AuthenticationGuard {
  constructor(
    @inject(TOKENS.IAuthenticationService) private jwtService: IAuthenticationService,
    @inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
  ) {}

  public async getAccount(sub: string): Promise<Account | null> {
    return this.accountRepository.findById(sub);
  }

  public getPayload(bearerToken?: string): IPayload | null {
    const token = this.extractTokenFromHeader(bearerToken);

    return token ? this.extractPayloadFromToken(token) : null;
  }

  public hasPermission(role: AccountRole, permission: PermissionEnum): boolean {
    return ROLE_PERMISSION[role].includes(permission);
  }

  private extractTokenFromHeader(bearerToken?: string): string | undefined {
    const [type, token] = bearerToken?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractPayloadFromToken(token: string): IPayload {
    try {
      return this.jwtService.verify(token);

    } catch (error) {
      throw new AppException(401, Errors.UNATHORIZED);

    }
  }
}
