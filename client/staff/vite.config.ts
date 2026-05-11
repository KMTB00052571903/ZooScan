import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dashboard del staff — corre en puerto 5174
// Proxy para API y WebSocket apuntando al backend en puerto 4000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
