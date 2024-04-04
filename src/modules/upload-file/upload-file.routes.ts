import { Router } from 'express';
import { UploadSingleController } from './use-cases/upload-single/upload-single.controller';

import multer from 'multer';
import multerConfig from '../../config/upload';

const router = Router();

const uploadSingleController = new UploadSingleController();

router.post('/single', multer(multerConfig).single('file'), uploadSingleController.handle);
// router.post('/multiple', multer(multerConfig).array('files'), controller.handle);

export default router;
