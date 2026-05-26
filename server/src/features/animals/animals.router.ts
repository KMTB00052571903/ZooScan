import { Router } from 'express'
import {
  getAnimalByIdController,
  getAnimalsController,
  getAnimalFunFactsController,
} from './animals.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const router = Router()

router.get('/', authMiddleware, getAnimalsController)
router.get('/:id', authMiddleware, getAnimalByIdController)
router.post('/:id/fun-facts', authMiddleware, getAnimalFunFactsController)
