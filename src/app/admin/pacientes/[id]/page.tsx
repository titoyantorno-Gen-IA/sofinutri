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
        <Link href="/admin/dashboard" className="text-sm hover:underline" style={{ color: '#b46d41' }}>
          ← Voltar
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold" style={{ color: '#687a77' }}>
            {paciente.nombre} {paciente.apellido}
          </h1>
          {paciente.deporte && <p className="text-sm" style={{ color: '#9cad9f' }}>{paciente.deporte}</p>}
        </div>
      </div>

      {/* Código de acesso */}
      <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: '#f5f0eb', border: '1px solid #cbaca6' }}>
        <div>
          <p className="text-sm font-medium" style={{ color: '#687a77' }}>Código de acesso do paciente</p>
          <p className="text-2xl font-bold tracking-widest mt-1 font-display" style={{ color: '#b46d41' }}>
            {paciente.codigo}
          </p>
        </div>
        <div className="text-right text-sm" style={{ color: '#9cad9f' }}>
          <p>Compartilhe este código</p>
          <p>com seu paciente</p>
        </div>
      </div>

      {registros.length > 0 ? (
        <>
          <GraficoPeso registros={registros} />

          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #cbaca6' }}>
            <table className="w-full text-sm">
              <thead style={{ background: '#f5f0eb', borderBottom: '1px solid #cbaca6' }}>
                <tr>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Data</th>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: '#687a77' }}>Hora</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: '#687a77' }}>Peso (kg)</th>
                </tr>
              </thead>
              <tbody>
                {[...registros].reverse().map((r: { id: string; fecha: string; hora: string; peso_kg: number }) => (
                  <tr key={r.id} className="border-b last:border-0" style={{ borderColor: '#f5f0eb' }}>
                    <td className="px-4 py-3" style={{ color: '#2d2d2d' }}>
                      {new Date(r.fecha + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3" style={{ color: '#2d2d2d' }}>{r.hora.slice(0, 5)}</td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: '#b46d41' }}>{r.peso_kg} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-16" style={{ color: '#cbaca6' }}>
          <p className="text-lg font-display">Sem registros ainda</p>
          <p className="text-sm mt-1">O paciente ainda não registrou seu peso</p>
        </div>
      )}
    </div>
  )
}
