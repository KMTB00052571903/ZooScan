import { Request, Response } from 'express'
import Boom from '@hapi/boom'
import { getUserFromRequest } from '../../middlewares/authMiddleware'
import { createAnnouncementService, getAnnouncementsService } from './announcements.service'

export const getAnnouncementsController = async (_req: Request, res: Response) => {
  const announcements = await getAnnouncementsService()
  return res.json(announcements)
}

export const createAnnouncementController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const { message, animal_id } = req.body
  if (!message || typeof message !== 'string') throw Boom.badRequest('message is required')
  const announcement = await createAnnouncementService(user.id, {
    message,
    animal_id: animal_id ?? null,
  })
  return res.status(201).json(announcement)
}
