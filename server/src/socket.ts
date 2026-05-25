import { Server } from 'socket.io'
import http from 'http'

let ioInstance: Server | undefined

export const setupSocket = (server: http.Server): Server => {
  ioInstance = new Server(server, {
    cors: { origin: '*' },
  })

  ioInstance.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id)

    socket.on('join:staff', () => socket.join('staff'))
    socket.on('join:visitor', () => socket.join('visitor'))

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id)
    })
  })

  return ioInstance
}

export const getIO = (): Server | undefined => ioInstance
