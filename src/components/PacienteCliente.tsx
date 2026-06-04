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
    const dados = sessionStorage.getItem('paciente')
    if (!dados) { router.push('/paciente'); return }
    const dadosP = JSON.parse(dados)
    if (dadosP.id !== paciente.id) { router.push('/paciente'); return }
    setAutorizado(true)
  }, [paciente.id, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setExito(false)
    await registrarPeso(paciente.id, parseFloat(peso), fecha, hora)
    setRegistros([{ id: Date.now().toString(), peso_kg: parseFloat(peso), fecha, hora }, ...registros])
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
    <div className="min-h-screen p-4" style={{ background: '#f5f0eb' }}>
      <div className="max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="text-center pt-6">
          <h1 className="text-xl font-display font-bold" style={{ color: '#687a77' }}>SofiNutri</h1>
          <p className="text-2xl font-display font-bold mt-1" style={{ color: '#b46d41' }}>
            Olá, {paciente.nombre}!
          </p>
          <p className="text-sm mt-1" style={{ color: '#9cad9f' }}>Registre seu peso de hoje</p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                min="30"
                max="300"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                placeholder="Ex: 72.5"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 text-xl text-center font-semibold"
                style={{ borderColor: '#cbaca6' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Data</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2.5 focus:outline-none"
                  style={{ borderColor: '#cbaca6' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#687a77' }}>Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2.5 focus:outline-none"
                  style={{ borderColor: '#cbaca6' }}
                />
              </div>
            </div>

            {exito && (
              <p className="text-sm text-center font-medium" style={{ color: '#9cad9f' }}>
                Peso registrado com sucesso!
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 hover:opacity-90 text-lg"
              style={{ background: '#b46d41' }}
            >
              {loading ? 'Salvando...' : 'Registrar peso'}
            </button>
          </form>
        </div>

        {/* Histórico */}
        {registros.length > 0 && (
          <>
            {registrosOrdenados.length >= 2 && <GraficoPeso registros={registrosOrdenados} />}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3" style={{ borderBottom: '1px solid #f5f0eb' }}>
                <h2 className="font-semibold font-display" style={{ color: '#687a77' }}>Seu histórico</h2>
              </div>
              <div>
                {registros.map((r) => (
                  <div key={r.id} className="px-4 py-3 flex justify-between items-center" style={{ borderBottom: '1px solid #f5f0eb' }}>
                    <p className="text-sm" style={{ color: '#9cad9f' }}>
                      {new Date(r.fecha + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                      {' · '}{r.hora.slice(0, 5)}
                    </p>
                    <p className="font-bold text-lg" style={{ color: '#b46d41' }}>{r.peso_kg} kg</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="text-center pb-6">
          <button
            onClick={() => { sessionStorage.removeItem('paciente'); router.push('/paciente') }}
            className="text-sm hover:opacity-70"
            style={{ color: '#cbaca6' }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
