import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'

export interface Scan {
  id: string;
  visitor_id: string;
  animal_id: string;
  created_at: string;
}

export interface CreateScanDTO {
  visitor_id: string;
  animal_id: string;
  created_at: string;
}

// export interface Product {
//   id: string
//   name: string
//   price: number
//   storeId: string
// }

// export interface CreateProductDTO {
//   name: string
//   price: number
//   storeId: string
// }

// export interface UpdateProductDTO {
//   id: string
//   name?: string
//   price?: number
// }

export const getScansService = async (visitor_id?: string , animal_id?: string): Promise<Scan[]> => {
  let query = supabase.from('products').select('*')
  if (visitor_id) query = query.eq('visitor_id', visitor_id)
  if (animal_id) query = query.eq('animal_id', animal_id)
  const { data, error } = await query
  if (error) throw Boom.badRequest(error.message)
  return (data ?? []) as Scan[]
}

export const getScanByIdService = async (ScanId: string): Promise<Scan> => {
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('id', ScanId)
    .single()
  if (error || !data) throw Boom.notFound('Product not found')
  return data as Scan
}

export const createScanService = async (scan: CreateScanDTO): Promise<Scan> => {
  const { data, error } = await supabase
    .from('scans')
    .insert([scan])
    .select()
    .single()
  if (error) throw Boom.badRequest(error.message)
  return data as Scan
}

// export const updateProductService = async (product: UpdateProductDTO): Promise<Product> => {
//   const { data, error } = await supabase
//     .from('products')
//     .update({ name: product.name, price: product.price })
//     .eq('id', product.id)
//     .select()
//     .single()
//   if (error || !data) throw Boom.notFound('Product not found')
//   return data as Product
// }

// export const deleteProductService = async (productId: string): Promise<void> => {
//   const { error } = await supabase.from('products').delete().eq('id', productId)
//   if (error) throw Boom.badRequest(error.message)
// }
