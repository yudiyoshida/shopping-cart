import { injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { generateIdWithLength } from 'shared/utils/id-generator/id-generator';
import { CreateAccountDto, IAccountRepository } from '../account-repository.interface';

@injectable()
export class AccountInMemoryAdapterRepository implements IAccountRepository {
  private _accounts: Account[] = [];

  public async findAllPaginated(page: number, size: number, search?: string): Promise<[Account[], number]> {
    const take = size;
    const skip = ((page - 1) * size);

    const accountsFiltered = this._accounts.filter(item => item.name.includes(search ?? ''));
    const accountsPaginated = accountsFiltered.slice(skip, skip + take);

    return [accountsPaginated, accountsFiltered.length] as [Account[], number];
  }

  public async findAll(search?: string | undefined): Promise<[Account[], number]> {
    const accounts = this._accounts.filter(item => item.name.includes(search ?? ''));

    return [accounts, accounts.length] as [Account[], number];
  }

  public async findById(id: string): Promise<Account|null> {
    const acc = this._accounts.find(item => item.id === id);

    return acc ?? null;
  }

  public async findByEmail(email: string): Promise<Account|null> {
    const acc = this._accounts.find(item => item.email === email);

    return acc ?? null;
  }

  public async save(data: CreateAccountDto): Promise<Account> {
    const id = generateIdWithLength(24);
    const newAcc = { ...data, id };

    this._accounts.push(newAcc);

    return newAcc;
  }
}
