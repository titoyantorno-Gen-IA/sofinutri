'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Registro {
  fecha: string
  hora: string
  peso_kg: number
}

export default function GraficoPeso({ registros }: { registros: Registro[] }) {
  const data = registros.map((r) => ({
    fecha: new Date(r.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }),
    peso: Number(r.peso_kg),
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Evolución de peso</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="fecha" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(v) => `${v} kg`}
          />
          <Tooltip formatter={(value) => [`${value} kg`, 'Peso']} />
          <Line
            type="monotone"
            dataKey="peso"
            stroke="#059669"
            strokeWidth={2}
            dot={{ fill: '#059669', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
