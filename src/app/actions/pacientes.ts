'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

function generarCodigo(nombre: string, apellido: string): string {
  const prefijo = (nombre.slice(0, 2) + apellido.slice(0, 2)).toUpperCase()
  const numero = Math.floor(1000 + Math.random() * 9000)
  return `${prefijo}-${numero}`
}

export async function crearPaciente(formData: FormData) {
  const nombre = formData.get('nombre') as string
  const apellido = formData.get('apellido') as string
  const deporte = formData.get('deporte') as string

  const supabase = createAdminClient()

  // Generar código único
  let codigo = generarCodigo(nombre, apellido)
  let intentos = 0
  while (intentos < 5) {
    const { data } = await supabase.from('pacientes').select('id').eq('codigo', codigo).single()
    if (!data) break
    codigo = generarCodigo(nombre, apellido)
    intentos++
  }

  const { error } = await supabase.from('pacientes').insert({
    nombre,
    apellido,
    deporte: deporte || null,
    codigo,
  })

  if (error) throw new Error('Error al crear paciente')

  revalidatePath('/admin/dashboard')
}

export async function obtenerPacientes() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('pacientes')
    .select('*')
    .eq('activo', true)
    .order('creado_en', { ascending: false })

  if (error) throw new Error('Error al obtener pacientes')
  return data
}

export async function obtenerPaciente(id: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('pacientes')
    .select('*, registros_peso(*)')
    .eq('id', id)
    .single()

  if (error) throw new Error('Error al obtener paciente')
  return data
}

export async function desactivarPaciente(id: string) {
  const supabase = createAdminClient()
  await supabase.from('pacientes').update({ activo: false }).eq('id', id)
  revalidatePath('/admin/dashboard')
}
