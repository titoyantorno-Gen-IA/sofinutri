'use client'

import Link from 'next/link'

interface Paciente {
  id: string
  nombre: string
  apellido: string
  deporte: string | null
  codigo: string
  creado_en: string
}

export default function ListaPacientes({ pacientes }: { pacientes: Paciente[] }) {
  if (pacientes.length === 0) {
    return (
      <div className="text-center py-16" style={{ color: '#cbaca6' }}>
        <p className="text-lg font-display">Nenhum paciente ainda</p>
        <p className="text-sm mt-1">Crie o primeiro com o botão acima</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #cbaca6' }}>
      <table className="w-full text-sm">
        <thead style={{ background: '#f5f0eb', borderBottom: '1px solid #cbaca6' }}>
          <tr>
            <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Paciente</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Esporte</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Código</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Cadastro</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id} className="border-b last:border-0 hover:bg-stone-50" style={{ borderColor: '#f5f0eb' }}>
              <td className="px-4 py-3 font-medium" style={{ color: '#2d2d2d' }}>{p.nombre} {p.apellido}</td>
              <td className="px-4 py-3" style={{ color: '#9cad9f' }}>{p.deporte ?? '—'}</td>
              <td className="px-4 py-3">
                <span className="font-mono px-2 py-0.5 rounded text-xs font-semibold tracking-wider"
                  style={{ background: '#f5f0eb', color: '#b46d41' }}>
                  {p.codigo}
                </span>
              </td>
              <td className="px-4 py-3" style={{ color: '#9cad9f' }}>
                {new Date(p.creado_en).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/pacientes/${p.id}`} className="font-medium hover:underline" style={{ color: '#b46d41' }}>
                  Ver histórico →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
