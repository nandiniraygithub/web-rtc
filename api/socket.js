import { Server } from 'socket.io'

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('🔧 Initializing Socket.IO server...')
    
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      transports: ['websocket', 'polling'],
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })

    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('✅ User connected:', socket.id)

      socket.on('join-room', (data) => {
        const { roomId, peerId } = data
        socket.join(roomId)
        console.log(`🏠 User ${socket.id} with peer ID ${peerId} joined room ${roomId}`)

        const roomUsers = io.sockets.adapter.rooms.get(roomId)
        console.log(`👥 Users in room ${roomId}:`, roomUsers ? Array.from(roomUsers) : [])

        socket.to(roomId).emit('user-joined', { userId: socket.id, peerId })
        console.log(`📢 Notified room ${roomId} about new user ${socket.id}`)

        socket.on('disconnect', () => {
          console.log('❌ User disconnected:', socket.id)
          socket.to(roomId).emit('user-left', socket.id)
        })
      })

      socket.onAny((eventName, ...args) => {
        console.log(`🔍 Socket event: ${eventName}`, args)
      })
    })
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}
