import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { TOKENS } from 'shared/ioc/token';
import { IAccountRepository } from '../../repositories/account-repository.interface';

@injectable()
export class FindAccountByEmailService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
  ) {}

  // apesar de não adicionar nenhuma lógica, a busca de conta pelo email é usado em diversos lugares no projeto.
  // logo, é interessante ter um serviço que centralize essa busca para facilitar a manutenção do código.
  public async execute(email: string): Promise<Account|null> {
    return this.repository.findByEmail(email);
  }
}
