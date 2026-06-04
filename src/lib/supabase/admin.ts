import { createClient } from '@supabase/supabase-js'

// Cliente con permisos de service_role — solo usar en Server Actions
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
