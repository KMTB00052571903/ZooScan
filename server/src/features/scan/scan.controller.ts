import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import {
  createScanService,
  // deleteProductService,
  getScanByIdService,
  getScansService,
  // updateProductService,
} from './scan.service';
import { getUserFromRequest } from '../../middlewares/authMiddleware';

export const getScansController = async (req: Request, res: Response) => {
  const { visitor_id, animal_id } = req.query;
  const scans = await getScansService((visitor_id ? String(visitor_id) : undefined),(animal_id ? String(animal_id) : undefined));
  return res.json(scans);
};

export const getScanByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw Boom.badRequest('Scan ID is required');
  const scan = await getScanByIdService(String(id));
  return res.json(scan);
};

export const createScanController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  if (!user) throw Boom.unauthorized('User not authenticated');
  if (!req.body) throw Boom.badRequest('Request body is required');

  const { visitor_id, animal_id, created_at } = req.body;
  if (!visitor_id || typeof visitor_id !== 'string') throw Boom.badRequest('Visitor ID is required');
  if (!animal_id || typeof animal_id !== 'string') throw Boom.badRequest('Animal ID is required');
  if (!created_at || typeof created_at !== 'string') throw Boom.badRequest('Creation date is required');


  const scan = await createScanService({ visitor_id, animal_id, created_at });
  return res.status(201).json(scan);
};

// export const updateProductController = async (req: Request, res: Response) => {
//   if (!req.body) throw Boom.badRequest('Request body is required');
//   const { id } = req.params;
//   const { name, price } = req.body;
//   if (!id) throw Boom.badRequest('Product ID is required');
//   if (name !== undefined && typeof name !== 'string') throw Boom.badRequest('Name must be a string');
//   if (price !== undefined && typeof price !== 'number') throw Boom.badRequest('Price must be a number');
//   const product = await updateProductService({ id: String(id), name, price });
//   return res.json(product);
// };

// export const deleteProductController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if (!id) throw Boom.badRequest('Product ID is required');
//   await deleteProductService(String(id));
//   return res.send('Product deleted');
// };
