# SofiNutri — Contexto del Proyecto

## Estado actual
- App completa y funcionando en local
- Build limpio sin errores
- Subido a GitHub
- **Pendiente: deploy en Vercel**

---

## Stack
- Next.js 16.2.7 (App Router)
- Supabase (DB + Auth)
- Tailwind CSS
- Recharts (gráfico de peso)
- Vercel (deploy — pendiente)

---

## Rutas
| Ruta | Descripción |
|---|---|
| `/paciente` | Acceso del paciente (código + nombre) |
| `/paciente/[id]` | Página privada del paciente |
| `/login` | Login de Sofia |
| `/admin/dashboard` | Dashboard con lista de pacientes |
| `/admin/pacientes/[id]` | Historial + gráfico de un paciente |

---

## Credenciales y accesos

### Supabase
- **Project ID:** pkmbppjtzbzdayeynqig
- **URL:** https://pkmbppjtzbzdayeynqig.supabase.co
- Las credenciales están en `.env.local`

### Usuario admin (Sofia)
- **Email:** sofiaynutricionista@gmail.com
- **Senha:** Sofinutri2026@

### GitHub
- **Repo:** https://github.com/titoyantorno-Gen-IA/sofinutri
- **Cuenta:** titoyantorno-Gen-IA (autenticado via gh CLI)

### Vercel
- **Token actual:** ver `.env.local`
- **Problema:** token con `limited: true` — no tiene permisos para crear proyectos
- **Solución pendiente:** crear token con Full Account en vercel.com/account/tokens

### n8n
- **URL:** https://n8neditor.geniagency.site
- **API Key:** en .env.local

---

## Estructura del proyecto
```
/Users/albertoyantorno/Sofi_nutri/sofinutri/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── auth.ts         → signOut
│   │   │   ├── pacientes.ts    → CRUD pacientes
│   │   │   └── peso.ts         → validar paciente, registrar peso
│   │   ├── admin/
│   │   │   ├── layout.tsx      → layout protegido
│   │   │   ├── dashboard/      → lista de pacientes
│   │   │   └── pacientes/[id]  → historial + gráfico
│   │   ├── login/              → login de Sofia
│   │   ├── paciente/           → acceso paciente
│   │   └── paciente/[id]/      → página privada paciente
│   ├── components/
│   │   ├── NuevoPacienteForm.tsx
│   │   ├── ListaPacientes.tsx
│   │   ├── GraficoPeso.tsx
│   │   └── PacienteCliente.tsx
│   ├── lib/supabase/
│   │   ├── client.ts           → browser client
│   │   ├── server.ts           → server client
│   │   ├── admin.ts            → service_role client
│   │   └── middleware.ts       → updateSession
│   └── proxy.ts                → protección rutas /admin/*
└── supabase/
    └── schema.sql              → ya ejecutado en Supabase
```

---

## Identidad visual (Manual de Sofia)
- **Sage Profundo:** #687a77 (títulos, labels)
- **Terracota:** #b46d41 (botones, CTA, códigos)
- **Blush Nude:** #cbaca6 (bordes, textos secundarios)
- **Rosa Suave:** #b66565 (errores)
- **Sage Claro:** #9cad9f (textos auxiliares)
- **Fondo:** #f5f0eb
- **Tipografía display:** Playfair Display (Google Fonts)
- **Idioma:** PT-BR

---

## Para levantar local
```bash
cd /Users/albertoyantorno/Sofi_nutri/sofinutri
npm run dev -- -p 3003
```
→ http://localhost:3003

---

## Próximo paso
Crear token Vercel con Full Account en:
**vercel.com/account/tokens**

Después correr:
```bash
cd /Users/albertoyantorno/Sofi_nutri/sofinutri
vercel --token TU_TOKEN_NUEVO --yes
```

Y configurar las env vars en Vercel:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SESSION_SECRET
