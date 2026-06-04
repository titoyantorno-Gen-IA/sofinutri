# PRD — SofiNutri
**Versión:** 1.0
**Fecha:** 2026-06-04
**Autor:** Alberto Yantorno
**Estado:** Borrador — pendiente de aprobación

---

## 1. Resumen ejecutivo

SofiNutri es una aplicación web para que Sofia (nutricionista deportiva) haga seguimiento del peso de sus pacientes. Sofia gestiona los pacientes desde un dashboard de administración. Cada paciente recibe un código único con el que accede a su página privada para registrar su peso con fecha y hora.

---

## 2. Problema que resuelve

Sofia lleva el seguimiento de peso de sus pacientes de forma manual (planillas, WhatsApp, etc.). Esto genera:
- Pérdida de datos o registros desorganizados
- Falta de historial visual por paciente
- Dependencia de que el paciente le mande los datos activamente

SofiNutri centraliza y automatiza este proceso.

---

## 3. Usuarios

| Usuario | Rol | Descripción |
|---|---|---|
| Sofia | Administradora | Nutricionista deportiva. Gestiona pacientes y visualiza progresos. |
| Paciente | Usuario final | Atleta atendido por Sofia. Solo puede registrar y ver su propio peso. |

---

## 4. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14+ (App Router) |
| Base de datos + Auth | Supabase |
| Deploy | Vercel |
| Repositorio | GitHub |
| Estilos | Tailwind CSS |

---

## 5. Flujo principal

```
Sofia (admin)
  └── Entra al dashboard con su cuenta
  └── Crea un nuevo paciente (nombre + datos básicos)
  └── El sistema genera un código único (ej: MART-4821)
  └── Sofia le comparte el código al paciente (por WhatsApp, etc.)

Paciente
  └── Entra a sofinutri.com/paciente
  └── Ingresa su código + su nombre
  └── Accede a su página privada
  └── Registra peso (kg) + fecha + hora
  └── Puede ver su historial propio
```

---

## 6. Funcionalidades

### 6.1 Dashboard de Sofia (admin)

| # | Funcionalidad | Prioridad |
|---|---|---|
| F01 | Login seguro de Sofia (email + contraseña via Supabase Auth) | Alta |
| F02 | Ver lista de todos los pacientes activos | Alta |
| F03 | Crear nuevo paciente (nombre, apellido, deporte opcional) | Alta |
| F04 | Ver código único generado por paciente | Alta |
| F05 | Ver historial de pesos de un paciente (tabla + gráfico de línea) | Alta |
| F06 | Marcar paciente como inactivo (sin eliminar datos) | Media |
| F07 | Exportar historial de un paciente a CSV | Baja |

### 6.2 Página del paciente

| # | Funcionalidad | Prioridad |
|---|---|---|
| F08 | Acceso con código + nombre (sin contraseña) | Alta |
| F09 | Registrar peso (kg), fecha y hora | Alta |
| F10 | Ver historial propio de pesos (tabla) | Alta |
| F11 | Gráfico de evolución de peso propio | Media |
| F12 | Editar o eliminar un registro propio | Baja |

---

## 7. Modelo de datos (Supabase)

### Tabla: `pacientes`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | Identificador único |
| nombre | text | Nombre del paciente |
| apellido | text | Apellido del paciente |
| deporte | text (nullable) | Deporte que practica |
| codigo | text (unique) | Código de acceso (ej: MART-4821) |
| activo | boolean | Si el paciente está activo |
| creado_en | timestamp | Fecha de creación |

### Tabla: `registros_peso`

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid (PK) | Identificador único |
| paciente_id | uuid (FK → pacientes.id) | Relación con el paciente |
| peso_kg | numeric(5,2) | Peso en kg (ej: 72.50) |
| fecha | date | Fecha del registro |
| hora | time | Hora del registro |
| creado_en | timestamp | Timestamp de carga |

---

## 8. Seguridad y acceso

- Sofia autentica con **email + contraseña** via Supabase Auth
- Los pacientes **no tienen cuenta** en Supabase. Acceden solo con código + nombre
- Las rutas del dashboard (`/admin/*`) están protegidas por middleware de Next.js
- Un paciente solo puede ver y cargar **sus propios registros**
- La validación del código + nombre se hace en el servidor (Server Action)
- El código del paciente se guarda en una **cookie de sesión** firmada al autenticarse

---

## 9. Diseño y UX

- Diseño limpio, mobile-first (los pacientes usan el celular para cargar el peso)
- Dashboard de Sofia optimizado para desktop
- Paleta de colores: verde + blanco (remite a salud/nutrición)
- Sin onboarding complejo — el paciente entra, carga el peso, listo

---

## 10. Criterios de éxito (MVP)

- [ ] Sofia puede crear un paciente y obtener su código
- [ ] El paciente puede autenticarse con código + nombre
- [ ] El paciente puede registrar su peso con fecha y hora
- [ ] Sofia puede ver el historial de pesos de cualquier paciente
- [ ] La app está deployada en Vercel y funciona en producción

---

## 11. Fuera del alcance (por ahora)

- Notificaciones o recordatorios automáticos
- Múltiples nutricionistas (multi-tenant)
- Registro de otros indicadores (grasa corporal, masa muscular, etc.)
- Plan nutricional o de entrenamiento
- App móvil nativa

---

## 12. Próximos pasos

1. Revisar y aprobar este PRD
2. Crear proyecto en Supabase y repositorio en GitHub
3. Inicializar proyecto Next.js con Tailwind
4. Implementar schema de base de datos
5. Construir autenticación de Sofia
6. Construir dashboard de admin
7. Construir flujo del paciente
8. Deploy en Vercel
