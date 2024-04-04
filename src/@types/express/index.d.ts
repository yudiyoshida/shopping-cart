import { Account } from 'modules/account/entities/account.entity';

// to make the file a module and avoid the TypeScript error.
export { };

declare global {
  namespace Express {
    export interface Request {
      auth: Account;
    }
  }

  namespace Express {
    namespace Multer {
      export interface File {
        location: string;
      }
    }
  }
}
