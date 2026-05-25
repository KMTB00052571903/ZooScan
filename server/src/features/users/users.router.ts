import { Router } from 'express'
import { getMeController } from './users.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const router = Router()

router.get('/me', authMiddleware, getMeController)
