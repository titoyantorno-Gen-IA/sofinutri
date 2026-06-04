'use client'

import { useState } from 'react'
import { crearPaciente } from '@/app/actions/pacientes'
import { useRouter } from 'next/navigation'

export default function NuevoPacienteForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await crearPaciente(formData)
    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-white font-semibold px-5 py-2.5 rounded-lg transition hover:opacity-90"
          style={{ background: '#b46d41' }}
        >
          + Novo paciente
        </button>
      ) : (
        <div className="bg-white rounded-xl p-6 max-w-lg" style={{ border: '1px solid #cbaca6' }}>
          <h2 className="text-lg font-display font-semibold mb-4" style={{ color: '#687a77' }}>Novo paciente</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Nome *</label>
                <input
                  name="nombre"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#cbaca6' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Sobrenome *</label>
                <input
                  name="apellido"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#cbaca6' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Esporte (opcional)</label>
              <input
                name="deporte"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                style={{ borderColor: '#cbaca6' }}
                placeholder="Ex: Futebol, Atletismo..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50 hover:opacity-90"
                style={{ background: '#b46d41' }}
              >
                {loading ? 'Criando...' : 'Criar paciente'}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm hover:opacity-70"
                style={{ color: '#9cad9f' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
