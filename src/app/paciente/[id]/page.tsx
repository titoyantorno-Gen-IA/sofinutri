import PacienteCliente from '@/components/PacienteCliente'
import { obtenerRegistrosPaciente } from '@/app/actions/peso'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'

export default async function PacientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createAdminClient()
  const { data: paciente } = await supabase
    .from('pacientes')
    .select('id, nombre, apellido')
    .eq('id', id)
    .eq('activo', true)
    .single()

  if (!paciente) notFound()

  const registros = await obtenerRegistrosPaciente(id)

  return <PacienteCliente paciente={paciente} registrosIniciales={registros} />
}
