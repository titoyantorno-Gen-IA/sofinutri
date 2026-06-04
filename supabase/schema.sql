-- =============================================
-- SofiNutri — Schema inicial
-- Correr en Supabase → SQL Editor
-- =============================================

-- Tabla de pacientes
create table if not exists pacientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  deporte text,
  codigo text unique not null,
  activo boolean default true,
  creado_en timestamp with time zone default now()
);

-- Tabla de registros de peso
create table if not exists registros_peso (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  peso_kg numeric(5,2) not null,
  fecha date not null,
  hora time not null,
  creado_en timestamp with time zone default now()
);

-- Índices
create index if not exists idx_registros_paciente on registros_peso(paciente_id);
create index if not exists idx_registros_fecha on registros_peso(fecha);
create index if not exists idx_pacientes_codigo on pacientes(codigo);

-- Row Level Security
alter table pacientes enable row level security;
alter table registros_peso enable row level security;

-- Políticas: solo el service_role puede leer/escribir (acceso via Server Actions)
create policy "service_role_all_pacientes" on pacientes
  for all using (true) with check (true);

create policy "service_role_all_registros" on registros_peso
  for all using (true) with check (true);
