import { AccountRole } from '../types/account-role.type';
import { AccountStatus } from '../types/account-status.type';

export interface Account {
  id: string;
  role: AccountRole;
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
}

// export class AccountEntity {
//   private _props: Account;

//   constructor(props: Partial<Account>) {
//     this._props = props as Account;
//   }

//   // Business logic
//   // public setStatus(): void {
//   //   this._props.status = this._props.role === 'seller' ? 'pending' : 'active';
//   // }
// }
