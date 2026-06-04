import { obtenerPaciente } from '@/app/actions/pacientes'
import GraficoPeso from '@/components/GraficoPeso'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PacienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let paciente
  try {
    paciente = await obtenerPaciente(id)
  } catch {
    notFound()
  }

  const registros = (paciente.registros_peso ?? []).sort(
    (a: { fecha: string; hora: string }, b: { fecha: string; hora: string }) =>
      new Date(`${a.fecha}T${a.hora}`).getTime() - new Date(`${b.fecha}T${b.hora}`).getTime()
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-emerald-600 hover:underline text-sm">
          ← Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{paciente.nombre} {paciente.apellido}</h1>
          {paciente.deporte && <p className="text-gray-500 text-sm">{paciente.deporte}</p>}
        </div>
      </div>

      {/* Código de acceso */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-700 font-medium">Código de acceso del paciente</p>
          <p className="text-2xl font-bold text-emerald-800 tracking-widest mt-1">{paciente.codigo}</p>
        </div>
        <div className="text-right text-sm text-emerald-600">
          <p>Compartí este código</p>
          <p>con tu paciente</p>
        </div>
      </div>

      {/* Gráfico */}
      {registros.length > 0 ? (
        <>
          <GraficoPeso registros={registros} />

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Hora</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Peso (kg)</th>
                </tr>
              </thead>
              <tbody>
                {[...registros].reverse().map((r: { id: string; fecha: string; hora: string; peso_kg: number }) => (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-700">{new Date(r.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td className="px-4 py-3 text-gray-700">{r.hora.slice(0, 5)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{r.peso_kg} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Sin registros todavía</p>
          <p className="text-sm mt-1">El paciente aún no cargó su peso</p>
        </div>
      )}
    </div>
  )
}
