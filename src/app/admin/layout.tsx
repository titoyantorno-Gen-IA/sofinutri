import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-emerald-700">SofiNutri</span>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">Panel Admin</span>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
