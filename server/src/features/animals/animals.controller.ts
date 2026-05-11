import { Request, Response } from 'express'
import Boom from '@hapi/boom'
import { getAnimalByIdService, getAnimalsService } from './animals.service'

const getIdFromParams = (params: Request['params']): string => {
  const id = params.id
  if (Array.isArray(id)) return id[0]
  if (typeof id === 'string') return id
  throw Boom.badRequest('ID parameter is required')
}

export const getAnimalsController = async (_req: Request, res: Response) => {
  const animals = await getAnimalsService()
  return res.json(animals)
}

export const getAnimalByIdController = async (req: Request, res: Response) => {
  const id = getIdFromParams(req.params)
  const animal = await getAnimalByIdService(id)
  return res.json(animal)
}
