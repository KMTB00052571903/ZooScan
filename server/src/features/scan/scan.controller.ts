import { Request, Response } from 'express'
import Boom from '@hapi/boom'
import {
  createScanByQrCodeService,
  createScanService,
  getScanByIdService,
  getScansService,
} from './scan.service'
import { getUserFromRequest } from '../../middlewares/authMiddleware'

export const getScansController = async (req: Request, res: Response) => {
  const { user_id, animal_id } = req.query
  const scans = await getScansService(
    user_id ? String(user_id) : undefined,
    animal_id ? String(animal_id) : undefined
  )
  return res.json(scans)
}

export const getScanByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) throw Boom.badRequest('Scan ID is required')
  const scan = await getScanByIdService(String(id))
  return res.json(scan)
}

export const createScanController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req)
  const { qr_code_id, animal_id } = req.body

  if (!qr_code_id && !animal_id) {
    throw Boom.badRequest('qr_code_id or animal_id is required')
  }

  let scan
  if (qr_code_id) {
    scan = await createScanByQrCodeService(user.id, String(qr_code_id))
  } else {
    scan = await createScanService({
      user_id: user.id,
      animal_id: String(animal_id),
      created_at: new Date().toISOString(),
    })
  }

  return res.status(201).json(scan)
}
