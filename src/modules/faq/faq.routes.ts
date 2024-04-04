import { Router } from 'express';

import { CreateFaqController } from './use-cases/create/create-faq.controller';
import { DeleteFaqController } from './use-cases/delete/delete-faq.controller';
import { FindAllFaqsController } from './use-cases/find-all/find-all-faqs.controller';
import { FindFaqByIdController } from './use-cases/find-by-id/find-faq-by-id.controller';
import { UpdateFaqController } from './use-cases/update/update-faq.controller';

const router = Router();

const findAllFaqsController = new FindAllFaqsController();
const findFaqByIdController = new FindFaqByIdController();
const createFaqController = new CreateFaqController();
const updateFaqController = new UpdateFaqController();
const deleteFaqController = new DeleteFaqController();

router
  .route('/')
  .post(createFaqController.handle)
  .get(findAllFaqsController.handle);

router
  .route('/:id')
  .get(findFaqByIdController.handle)
  .put(updateFaqController.handle)
  .delete(deleteFaqController.handle);

export default router;
