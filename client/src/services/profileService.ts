import { supabase } from './supabase';

export interface Profile {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar_url: string;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(
  updates: Partial<Pick<Profile, 'name' | 'username' | 'avatar_url'>>
): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id);

  if (error) throw error;
}
