'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registrarPeso } from '@/app/actions/peso'
import GraficoPeso from './GraficoPeso'

interface Paciente {
  id: string
  nombre: string
  apellido: string
}

interface Registro {
  id: string
  peso_kg: number
  fecha: string
  hora: string
}

export default function PacienteCliente({
  paciente,
  registrosIniciales,
}: {
  paciente: Paciente
  registrosIniciales: Registro[]
}) {
  const router = useRouter()
  const [registros, setRegistros] = useState(registrosIniciales)
  const [peso, setPeso] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [hora, setHora] = useState(new Date().toTimeString().slice(0, 5))
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    // Verificar que el paciente está autenticado via sessionStorage
    const datos = sessionStorage.getItem('paciente')
    if (!datos) {
      router.push('/paciente')
      return
    }
    const datosP = JSON.parse(datos)
    if (datosP.id !== paciente.id) {
      router.push('/paciente')
      return
    }
    setAutorizado(true)
  }, [paciente.id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setExito(false)

    await registrarPeso(paciente.id, parseFloat(peso), fecha, hora)

    setRegistros([
      { id: Date.now().toString(), peso_kg: parseFloat(peso), fecha, hora },
      ...registros,
    ])
    setPeso('')
    setExito(true)
    setLoading(false)
    setTimeout(() => setExito(false), 3000)
  }

  if (!autorizado) return null

  const registrosOrdenados = [...registros].sort(
    (a, b) => new Date(`${a.fecha}T${a.hora}`).getTime() - new Date(`${b.fecha}T${b.hora}`).getTime()
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-6">
          <h1 className="text-2xl font-bold text-emerald-700">Hola, {paciente.nombre}!</h1>
          <p className="text-gray-500 text-sm mt-1">Registrá tu peso de hoy</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                min="30"
                max="300"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                placeholder="Ej: 72.5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xl text-center font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {exito && (
              <p className="text-emerald-600 text-sm text-center font-medium">
                Peso registrado correctamente
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 text-lg"
            >
              {loading ? 'Guardando...' : 'Registrar peso'}
            </button>
          </form>
        </div>

        {/* Historial */}
        {registros.length > 0 && (
          <>
            {registrosOrdenados.length >= 2 && (
              <GraficoPeso registros={registrosOrdenados} />
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="font-semibold text-gray-700">Tu historial</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {registros.map((r) => (
                  <div key={r.id} className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(r.fecha + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                        {' · '}{r.hora.slice(0, 5)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">{r.peso_kg} kg</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="text-center pb-6">
          <button
            onClick={() => {
              sessionStorage.removeItem('paciente')
              router.push('/paciente')
            }}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
