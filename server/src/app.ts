import express from 'express'
import cors from 'cors'

import { PORT } from './config'
import { errorsMiddleware } from './middlewares/errorsMiddleware'

import { router as authRouter }          from './features/auth/auth.router'
import { router as animalsRouter }       from './features/animals/animals.router'
import { router as scanRouter }          from './features/scan/scan.router'
import { router as orderRouter }         from './features/orders/order.router'
import { router as usersRouter }         from './features/users/users.router'
import { router as favoritesRouter }     from './features/favorites/favorites.router'
import { router as announcementsRouter } from './features/announcements/announcements.router'

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}))

// Log todas las requests entrantes
app.use((req, _res, next) => {
  console.log(`[server] ${req.method} ${req.path}`)
  next()
})

app.get('/', (_req, res) => {
  res.json({
    message: 'ZooScan API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth/login, /api/auth/register',
      animals: '/api/animals',
      scans: '/api/scans',
      users: '/api/users/me',
      favorites: '/api/favorites',
      announcements: '/api/announcements',
      orders: '/api/orders',
      health: '/api/health',
    },
  })
})

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRouter)
app.use('/api/animals', animalsRouter)
app.use('/api/scans', scanRouter)
app.use('/api/orders', orderRouter)
app.use('/api/users', usersRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/announcements', announcementsRouter)

app.use(errorsMiddleware)

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`ZooScan server running on http://localhost:${PORT}`)
    console.log('Rutas registradas:')
    console.log('  GET    /api/animals')
    console.log('  GET    /api/animals/:id')
    console.log('  POST   /api/animals/:id/fun-facts  ← Groq')
    console.log('  POST   /api/scans')
    console.log('  GET    /api/users/me')
    console.log('  GET    /api/favorites')
    console.log('  POST   /api/favorites')
    console.log('  DELETE /api/favorites/:animalId')
    console.log('  GET    /api/announcements')
    console.log('  POST   /api/announcements')
  })
}

export default app
