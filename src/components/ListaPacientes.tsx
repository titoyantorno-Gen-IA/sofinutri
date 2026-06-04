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
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No hay pacientes todavía</p>
        <p className="text-sm mt-1">Creá el primero con el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Paciente</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Deporte</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Código</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Alta</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{p.nombre} {p.apellido}</td>
              <td className="px-4 py-3 text-gray-500">{p.deporte ?? '—'}</td>
              <td className="px-4 py-3">
                <span className="font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold tracking-wider">
                  {p.codigo}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(p.creado_en).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/pacientes/${p.id}`}
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Ver historial →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
