import { Router } from 'express'
import { getFavoritesController, addFavoriteController, removeFavoriteController } from './favorites.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const router = Router()

router.get('/', authMiddleware, getFavoritesController)
router.post('/', authMiddleware, addFavoriteController)
router.delete('/:animalId', authMiddleware, removeFavoriteController)
