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
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          + Nuevo paciente
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Nuevo paciente</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  name="nombre"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                <input
                  name="apellido"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deporte (opcional)</label>
              <input
                name="deporte"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ej: Fútbol, Atletismo..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Creando...' : 'Crear paciente'}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
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
