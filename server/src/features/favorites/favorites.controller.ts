import { Request, Response } from 'express'
import Boom from '@hapi/boom'
import { getUserFromRequest } from '../../middlewares/authMiddleware'
import { getFavoritesService, addFavoriteService, removeFavoriteService } from './favorites.service'

export const getFavoritesController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const favorites = await getFavoritesService(user.id)
  return res.json(favorites)
}

export const addFavoriteController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const { animal_id } = req.body
  if (!animal_id) throw Boom.badRequest('animal_id is required')
  await addFavoriteService(user.id, String(animal_id))
  return res.status(201).json({ success: true })
}

export const removeFavoriteController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const { animalId } = req.params
  if (!animalId) throw Boom.badRequest('animalId is required')
  await removeFavoriteService(user.id, String(animalId))
  return res.json({ success: true })
}
