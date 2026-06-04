import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen" style={{ background: '#f5f0eb' }}>
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: '#cbaca6' }}>
        <div className="flex items-center gap-3">
          <span className="text-xl font-display font-bold" style={{ color: '#687a77' }}>SofiNutri</span>
          <span style={{ color: '#cbaca6' }}>|</span>
          <span className="text-sm" style={{ color: '#9cad9f' }}>Painel Admin</span>
        </div>
        <form action={signOut}>
          <button type="submit" className="text-sm transition hover:opacity-70" style={{ color: '#cbaca6' }}>
            Sair
          </button>
        </form>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
