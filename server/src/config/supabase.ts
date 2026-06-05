import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_KEY } from '.';

// El servidor usa service_role para bypassear RLS en queries de datos.
// auth.getUser() también funciona con este cliente.
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || SUPABASE_KEY
);
