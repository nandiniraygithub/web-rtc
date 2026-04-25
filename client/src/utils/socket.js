import { io } from 'socket.io-client'

// Dynamic socket connection based on environment
const getSocketUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000'
  }
  
  // For Netlify frontend + Vercel backend deployment
  // Your actual Vercel server URL
  return 'https://web-jnfrvpjc8-nandiniraygithubs-projects.vercel.app/api/socket'
}

const socket = io(getSocketUrl(), {
  path: '/api/socket',
  transports: ['websocket', 'polling']
})

export default socket
