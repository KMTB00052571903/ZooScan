import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'
import type { Scan, CreateScanDTO } from './scan.types'

export const getScansService = async (visitor_id?: string, animal_id?: string): Promise<Scan[]> => {
  let query = supabase.from('scans').select('*')
  if (visitor_id) query = query.eq('visitor_id', visitor_id)
  if (animal_id) query = query.eq('animal_id', animal_id)
  const { data, error } = await query
  if (error) throw Boom.badRequest(error.message)
  return (data ?? []) as Scan[]
}

export const getScanByIdService = async (scanId: string): Promise<Scan> => {
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('id', scanId)
    .single()
  if (error || !data) throw Boom.notFound('Scan not found')
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
