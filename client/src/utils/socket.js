import { io } from 'socket.io-client'

// Dynamic socket connection based on environment
const getSocketUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000'
  }
  
  // For Vercel deployment, use the same origin with API path
  return `${window.location.origin}/api/socket`
}

const socket = io(getSocketUrl(), {
  path: '/api/socket',
  transports: ['websocket', 'polling']
})

export default socket
