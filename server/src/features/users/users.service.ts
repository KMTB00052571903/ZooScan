import { supabase } from '../../config/supabase'
import Boom from '@hapi/boom'
import type { AuthUser } from '@supabase/supabase-js'
import type { UserProfile } from './users.types'

const XP_PER_SCAN = 50
const XP_PER_LEVEL = 150

export const getUserProfileService = async (authUser: AuthUser): Promise<UserProfile> => {
  const userId = authUser.id
  const email = authUser.email ?? ''

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', userId)
    .single()

  const { count: scansTotal, error: scansError } = await supabase
    .from('scans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (scansError) throw Boom.badImplementation(scansError.message)

  const { count: favoritesTotal, error: favError } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (favError) throw Boom.badImplementation(favError.message)

  const totalScans = scansTotal ?? 0
  const level = Math.floor((totalScans * XP_PER_SCAN) / XP_PER_LEVEL) + 1

  return {
    id: userId,
    email,
    name: profile?.name ?? 'User',
    role: profile?.role ?? 'visitor',
    stats: {
      scans_total: totalScans,
      favorites: favoritesTotal ?? 0,
      level,
    },
  }
}
