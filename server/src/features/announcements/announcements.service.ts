import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'
import { getIO } from '../../socket'
import type { Announcement, CreateAnnouncementDTO } from './announcements.types'

export const createAnnouncementService = async (
  staffId: string,
  dto: CreateAnnouncementDTO
): Promise<Announcement> => {
  const { data, error } = await supabase
    .from('announcements')
    .insert({ message: dto.message, staff_id: staffId, animal_id: dto.animal_id ?? null })
    .select()
    .single()

  if (error) throw Boom.badRequest(error.message)

  const announcement = data as Announcement

  getIO()?.to('visitor').emit('announcement:new', {
    message: announcement.message,
    animal_id: announcement.animal_id,
  })

  return announcement
}

export const getAnnouncementsService = async (limit = 5): Promise<Announcement[]> => {
  const { data, error } = await supabase
    .from('announcements')
    .select('id, message, created_at, animal_id, staff_id')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw Boom.badRequest(error.message)
  return (data ?? []) as Announcement[]
}
