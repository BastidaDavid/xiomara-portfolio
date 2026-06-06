# Xiomara Vázquez Portfolio

Portfolio bilingüe en React, TypeScript, Vite y Supabase.

## Desarrollo

```bash
npm install
npm run dev
```

## Supabase

1. Crea un proyecto en Supabase.
2. En SQL Editor, ejecuta `supabase/projects.sql`.
3. En Authentication, crea manualmente los usuarios administradores autorizados.
4. Desactiva el signup público si sólo quieres admins invitados.
5. Copia `.env.example` a `.env.local` y agrega:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Los visitantes pueden leer `projects`. Los usuarios autenticados pueden crear, editar y eliminar proyectos por RLS.

## Vercel

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

Configura las mismas variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en Vercel.
