import { Request, Response } from 'express'
import { getUserFromRequest } from '../../middlewares/authMiddleware'
import { getUserProfileService } from './users.service'

export const getMeController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const profile = await getUserProfileService(user)
  return res.json(profile)
}
