import { Router } from 'express'
import { getAnnouncementsController, createAnnouncementController } from './announcements.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

export const router = Router()

router.get('/', authMiddleware, getAnnouncementsController)
router.post('/', authMiddleware, createAnnouncementController)
