# ZooScan — Ecosistema de dos apps para la Fundación Zoológica de Cali

Proyecto universitario — Desarrollo Web

---

## ¿Qué es ZooScan?

ZooScan transforma la visita al zoológico en una experiencia interactiva:

- **Visitantes** escanean códigos QR junto a cada hábitat y reciben información detallada del animal, acumulan XP, desbloquean su colección y guardan favoritos.
- **Personal del zoo** monitorea en tiempo real qué animales se escanean más, ve los visitantes activos del día y envía anuncios en vivo que aparecen como notificaciones en los teléfonos de los visitantes.

---

## Estructura del proyecto

```
ZooScan-main/
├── client/
│   ├── visitor/    →  App móvil web del visitante (React + Vite + Supabase)
│   └── staff/      →  Dashboard del personal (React + Vite + Recharts + Supabase)
└── server/
    └── README.md   →  Documentación del backend (Supabase)
```

---

## Levantar el proyecto

### Prerrequisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) con las tablas creadas (ver `server/README.md`)

### App del visitante

```bash
cd client/visitor
cp .env.example .env        # agregar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm install
npm run dev                 # http://localhost:5173
```

### Dashboard del staff

```bash
cd client/staff
cp .env.example .env        # mismas variables Supabase
npm install
npm run dev                 # http://localhost:5174
```

---

## Credenciales demo

| Rol       | Email              | Contraseña |
|-----------|--------------------|------------|
| Visitante | user@zoo.com       | user123    |
| Staff     | staff@zoo.com      | staff123   |

> El dashboard valida que el usuario tenga `role = 'staff'` en la tabla `profiles`. La app del visitante acepta cualquier cuenta.

---

## Flujo de demo completo

### Flujo del visitante
1. Abre **http://localhost:5173** y crea una cuenta (o usa las credenciales demo)
2. En Home: ve tus favoritos y tu progreso de colección
3. Toca **Scan QR** → simula un escaneo → gana +50 XP y desbloquea el animal
4. En **Mi Colección** ve todos los animales desbloqueados/bloqueados
5. Toca un animal desbloqueado para ver su ficha completa (descripción, hábitat, nivel de peligro)
6. Agrega/quita favoritos con ❤️ — se guarda en Supabase en tiempo real

### Flujo del staff
1. Abre **http://localhost:5174** e inicia sesión con `staff@zoo.com`
2. Ve el dashboard con estadísticas de escaneos del día, top animales, visitantes activos
3. El panel se actualiza automáticamente cada 30 segundos
4. Escribe un anuncio y selecciona un animal → **Enviar** guarda el anuncio en Supabase

---

## Cumplimiento de la rúbrica

| Criterio | Implementación |
|----------|---------------|
| **2 apps web que funcionan juntas** | `client/visitor` (visitante) + `client/staff` (staff) |
| **Base de datos** | Supabase PostgreSQL — tablas `profiles`, `animals`, `scans`, `favorites`, `announcements` |
| **Autenticación funcional** | Supabase Auth — registro + login + logout con sesión persistente |
| **Captura de datos del entorno físico** | QR scanner simulado → `scanAnimal()` registra el escaneo en Supabase |
| **Comunicación en tiempo real (placeholder)** | `useRealtime.ts` en ambos clientes — hook tipado con TODO para activar Supabase Realtime |
| **Componentes reutilizables** | `LoadingState`, `ErrorMessage`, `EmptyState`, `AuthForm`, `PrimaryButton`, `SectionCard`, `StatCard` |
| **Context / Provider Pattern** | `AuthProvider`, `UserProvider`, `FavoritesProvider`, `SpeciesProvider`, `StatsProvider`, `AnnouncementsProvider` |
| **Feedback al usuario** | `react-hot-toast` en login, signup, logout, favoritos, escaneos y anuncios |
| **Variables de entorno** | `.env.example` en cada cliente con variables Supabase documentadas |
| **Prototipo demo-listo** | Ambas apps corren con `npm run dev`, flujo completo funcional |

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| App visitante | React 19, TypeScript, Vite, React Router 7, react-hot-toast |
| Dashboard staff | React 19, TypeScript, Vite, Recharts, react-hot-toast |
| Backend / BaaS | Supabase (PostgreSQL + Auth + RLS) |
| State management | React Context + Provider Pattern |
| Deploy | Vercel (visitor) |
