import { obtenerPacientes } from '@/app/actions/pacientes'
import NuevoPacienteForm from '@/components/NuevoPacienteForm'
import ListaPacientes from '@/components/ListaPacientes'

export default async function DashboardPage() {
  const pacientes = await obtenerPacientes()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold" style={{ color: '#687a77' }}>Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: '#9cad9f' }}>
          {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''} ativo{pacientes.length !== 1 ? 's' : ''}
        </p>
      </div>

      <NuevoPacienteForm />
      <ListaPacientes pacientes={pacientes} />
    </div>
  )
}
