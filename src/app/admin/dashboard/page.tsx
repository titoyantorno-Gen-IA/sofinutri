import { obtenerPacientes } from '@/app/actions/pacientes'
import NuevoPacienteForm from '@/components/NuevoPacienteForm'
import ListaPacientes from '@/components/ListaPacientes'

export default async function DashboardPage() {
  const pacientes = await obtenerPacientes()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">{pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''} activo{pacientes.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <NuevoPacienteForm />
      <ListaPacientes pacientes={pacientes} />
    </div>
  )
}
