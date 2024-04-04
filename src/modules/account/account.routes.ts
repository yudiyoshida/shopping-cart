import { Router } from 'express';

import { CreateAccountController } from './use-cases/create/create-account.controller';
import { FindAllAccountsController } from './use-cases/find-all/find-all-accounts.controller';

const router = Router();

const createAccountController = new CreateAccountController();
const findAllAccountsController = new FindAllAccountsController();

router
  .route('/')
  .post(createAccountController.handle)
  .get(findAllAccountsController.handle);

export default router;
