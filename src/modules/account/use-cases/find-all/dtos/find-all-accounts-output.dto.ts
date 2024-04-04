import { Exclude, Expose } from 'class-transformer';
import { Account } from 'modules/account/entities/account.entity';
import { AccountRole } from 'modules/account/types/account-role.type';
import { AccountStatus } from 'modules/account/types/account-status.type';

export class FindAllAccountsOutputDto implements Account {
  @Exclude() password!: string;

  @Expose() id!: string;
  @Expose() role!: AccountRole;
  @Expose() name!: string;
  @Expose() email!: string;
  @Expose() status!: AccountStatus;
}
