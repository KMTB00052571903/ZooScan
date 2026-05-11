# Server

El backend de ZooScan está gestionado completamente por **Supabase** (PostgreSQL + Auth + Realtime), lo que elimina la necesidad de un servidor Express independiente.

## Servicios de Supabase utilizados

| Servicio       | Uso                                                              |
|----------------|------------------------------------------------------------------|
| **Auth**       | Registro e inicio de sesión con email/password                   |
| **PostgreSQL** | Tablas: `profiles`, `animals`, `scans`, `favorites`, `announcements` |
| **RLS**        | Row Level Security habilitado en todas las tablas                |
| **Storage**    | Reservado para imágenes de animales (futuro)                     |

## Variables de entorno

Ambos clientes necesitan las siguientes variables en su archivo `.env` (ver `.env.example` en cada carpeta):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Obtén estos valores en [app.supabase.com](https://app.supabase.com) → Settings → API.

## Estructura de la base de datos

```sql
profiles       (id, name, xp, role)
animals        (id, name, description, habitat, danger_level, category)
scans          (id, user_id, animal_id, scanned_at)
favorites      (id, user_id, animal_id)
announcements  (id, message, animal_id, created_at)
```
