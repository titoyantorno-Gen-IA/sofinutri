'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f0eb' }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold" style={{ color: '#687a77' }}>SofiNutri</h1>
          <p className="mt-1 text-sm" style={{ color: '#cbaca6' }}>Painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: '#cbaca6', '--tw-ring-color': '#687a77' } as React.CSSProperties}
              placeholder="sofia@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: '#cbaca6' } as React.CSSProperties}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-center" style={{ color: '#b66565' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            style={{ background: '#b46d41' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
