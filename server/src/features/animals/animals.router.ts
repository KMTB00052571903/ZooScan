import { Router } from 'express'
import {
  // createStoreController,
  // deleteStoreController,
  // getMyStoreController,
  getAnimalByIdController,
  getAnimalsController,
  // updateStoreController,
} from './animals.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const router = Router()

// Public
router.get('/', getAnimalsController)
// router.get('/me', authMiddleware, getMyStoreController)
router.get('/:id', getAnimalByIdController)

// Protected
// router.post('/', authMiddleware, createStoreController)
// router.patch('/:id', authMiddleware, updateStoreController)
// router.delete('/:id', authMiddleware, deleteStoreController)
