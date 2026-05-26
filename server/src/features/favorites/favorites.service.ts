import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'
import type { Animal } from '../animals/animals.types'

export const getFavoritesService = async (userId: string): Promise<Animal[]> => {
  const { data, error } = await supabase
    .from('favorites')
    .select('animals(id, name, species, habitat, description, image_url, qr_code_id)')
    .eq('user_id', userId)

  if (error) throw Boom.badRequest(error.message)

  return ((data ?? []) as unknown[])
    .map((row) => {
      const r = row as Record<string, unknown>
      const raw = r.animals
      return (Array.isArray(raw) ? raw[0] : raw) as Animal | null
    })
    .filter((a): a is Animal => a != null)
}

export const addFavoriteService = async (userId: string, animalId: string): Promise<void> => {
  const { data: animal, error: animalError } = await supabase
    .from('animals')
    .select('id')
    .eq('id', animalId)
    .single()

  if (animalError || !animal) throw Boom.notFound('Animal not found')

  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, animal_id: animalId })

  if (error) throw Boom.badRequest(error.message)
}

export const removeFavoriteService = async (userId: string, animalId: string): Promise<void> => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('animal_id', animalId)

  if (error) throw Boom.badRequest(error.message)
}
