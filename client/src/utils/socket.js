import { io } from 'socket.io-client'

// Use current origin for socket connection
const socket = io(window.location.origin.includes('localhost') ? 'http://localhost:5000' : `${window.location.protocol}//${window.location.hostname}:5000`)

export default socket
