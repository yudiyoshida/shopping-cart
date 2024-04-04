import { Account } from '../entities/account.entity';
import { AccountRole } from '../types/account-role.type';
import { AccountStatus } from '../types/account-status.type';

export interface IAccountRepository {
  findAll(search?: string): Promise<[Account[], number]>;
  findAllPaginated(page: number, size: number, search?: string): Promise<[Account[], number]>;
  findById(id: string): Promise<Account|null>;
  findByEmail(email: string): Promise<Account|null>;
  save(data: CreateAccountDto): Promise<Account>;
}

export class CreateAccountDto implements Omit<Account, 'id'> {
  role!: AccountRole;
  name!: string;
  email!: string;
  password!: string;
  status!: AccountStatus;
}
