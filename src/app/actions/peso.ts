'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function validarPaciente(codigo: string, nombre: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('pacientes')
    .select('id, nombre, apellido, codigo')
    .eq('codigo', codigo.toUpperCase())
    .eq('activo', true)
    .single()

  if (!data) return null

  // Validar que el nombre coincida (flexible, solo primer nombre)
  const nombreIngresado = nombre.trim().toLowerCase()
  const nombreDB = data.nombre.trim().toLowerCase()
  if (!nombreDB.startsWith(nombreIngresado) && !nombreIngresado.startsWith(nombreDB)) {
    return null
  }

  return data
}

export async function registrarPeso(pacienteId: string, peso: number, fecha: string, hora: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('registros_peso').insert({
    paciente_id: pacienteId,
    peso_kg: peso,
    fecha,
    hora,
  })

  if (error) throw new Error('Error al registrar peso')
  revalidatePath(`/paciente/${pacienteId}`)
}

export async function obtenerRegistrosPaciente(pacienteId: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('registros_peso')
    .select('*')
    .eq('paciente_id', pacienteId)
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false })

  if (error) throw new Error('Error al obtener registros')
  return data
}
