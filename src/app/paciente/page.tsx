'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { validarPaciente } from '@/app/actions/peso'

export default function AccesoPacientePage() {
  const router = useRouter()
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const paciente = await validarPaciente(codigo, nombre)

    if (!paciente) {
      setError('Código ou nome incorreto. Verifique com sua nutricionista.')
      setLoading(false)
      return
    }

    sessionStorage.setItem('paciente', JSON.stringify(paciente))
    router.push(`/paciente/${paciente.id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f0eb' }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold" style={{ color: '#687a77' }}>SofiNutri</h1>
          <p className="mt-1 text-sm" style={{ color: '#cbaca6' }}>Entre com seu código pessoal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Seu código</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              required
              placeholder="Ex: MAGO-1234"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 font-mono tracking-widest text-center text-lg uppercase"
              style={{ borderColor: '#cbaca6' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Seu nome</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ex: Martina"
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: '#cbaca6' }}
            />
          </div>

          {error && <p className="text-sm text-center" style={{ color: '#b66565' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            style={{ background: '#b46d41' }}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
