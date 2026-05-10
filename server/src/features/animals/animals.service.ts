import Boom from '@hapi/boom'
import { supabase } from '../../config/supabase'
import type {  Animal } from './animals.types'

export const getAnimalsService = async (): Promise<Animal[]> => {
  const { data, error } = await supabase.from('animals').select('*')
  if (error) throw Boom.badImplementation(error.message)
  return (data ?? []) as Animal[]
}

export const getAnimalByIdService = async (id: string): Promise<Animal> => {
  const { data, error } = await supabase
    .from('animals')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) throw Boom.notFound('Animal not found')
  return data as Animal
}

// export const getAnimalByUserIdService = async (userId: string): Promise<Animal | null> => {
//   const { data, error } = await supabase
//     .from('animals')
//     .select('*')
//     .eq('userId', userId)
//     .single()
//   if (error || !data) return null
//   return data as Animal
// }

// export const createStoreService = async (store: CreateStoreDTO): Promise<Store> => {
//   const { data, error } = await supabase
//     .from('stores')
//     .insert([{ name: store.name, userId: store.userId }])
//     .select()
//     .single()
//   if (error) throw Boom.badRequest(error.message)
//   return data as Store
// }

// export const updateStoreService = async (store: UpdateStoreDTO): Promise<Store> => {
//   const { data, error } = await supabase
//     .from('stores')
//     .update({ name: store.name, isOpen: store.isOpen })
//     .eq('id', store.id)
//     .select()
//     .single()
//   if (error || !data) throw Boom.badRequest(error?.message ?? 'Update failed')
//   return data as Store
// }

// export const deleteStoreService = async (id: string): Promise<void> => {
//   const { error } = await supabase.from('stores').delete().eq('id', id)
//   if (error) throw Boom.badRequest(error.message)
// }
