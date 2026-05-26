import express from 'express'
import cors from 'cors'
import http from 'http'

import { PORT } from './config'
import { errorsMiddleware } from './middlewares/errorsMiddleware'
import { setupSocket } from './socket'

import { router as authRouter } from './features/auth/auth.router'
import { router as animalsRouter } from './features/animals/animals.router'
import { router as scanRouter } from './features/scan/scan.router'
import { router as orderRouter } from './features/orders/order.router'
import { router as usersRouter } from './features/users/users.router'
import { router as favoritesRouter } from './features/favorites/favorites.router'
import { router as announcementsRouter } from './features/announcements/announcements.router'

const app = express()

app.use(express.json())
app.use(cors())

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

const server = http.createServer(app)
setupSocket(server)

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`ZooScan server running on http://localhost:${PORT}`)
  })
}

export default app
export { server }
