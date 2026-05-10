import { Router } from 'express';
import {
  createScanController,
  // deleteProductController,
  getScanByIdController,
  getScansController,
  // updateProductController,
} from './scan.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const router = Router();


// Protected: only store owners manage products
router.post('/', authMiddleware , createScanController);
router.get('/' , authMiddleware , getScansController);
router.get('/:id' , authMiddleware , getScanByIdController);
// router.patch('/:id', authMiddleware, updateProductController);
// router.delete('/:id', authMiddleware, deleteProductController);
