import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'
import type { Scan, CreateScanDTO } from './scan.types'

export const getScansService = async (user_id?: string, animal_id?: string): Promise<Scan[]> => {
  let query = supabase.from('scans').select('*')
  if (user_id) query = query.eq('user_id', user_id)
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

export const createScanByQrCodeService = async (userId: string, qrCodeId: string): Promise<Scan> => {
  const { data: animal, error: animalError } = await supabase
    .from('animals')
    .select('id, name, species')
    .eq('qr_code_id', qrCodeId)
    .single()

  if (animalError || !animal) throw Boom.notFound(`No animal found for QR code: ${qrCodeId}`)

  return createScanService({
    user_id: userId,
    animal_id: String(animal.id),
    created_at: new Date().toISOString(),
  })
}

export const createScanService = async (scan: CreateScanDTO): Promise<Scan> => {
  const { data, error } = await supabase
    .from('scans')
    .insert([scan])
    .select()
    .single()
  if (error) throw Boom.badRequest(error.message)
  // Supabase Realtime notifica automáticamente a los clientes suscritos
  return data as Scan
}
