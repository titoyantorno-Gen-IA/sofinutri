'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface Registro {
  fecha: string
  hora: string
  peso_kg: number
}

export default function GraficoPeso({ registros }: { registros: Registro[] }) {
  const data = registros.map((r) => ({
    data: new Date(r.fecha + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    peso: Number(r.peso_kg),
  }))

  return (
    <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #cbaca6' }}>
      <h2 className="text-base font-semibold mb-4" style={{ color: '#687a77' }}>Evolução do peso</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f0eb" />
          <XAxis dataKey="data" tick={{ fontSize: 12 }} stroke="#cbaca6" />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} stroke="#cbaca6" tickFormatter={(v) => `${v} kg`} />
          <Tooltip formatter={(value) => [`${value} kg`, 'Peso']} />
          <Line
            type="monotone"
            dataKey="peso"
            stroke="#b46d41"
            strokeWidth={2}
            dot={{ fill: '#b46d41', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
