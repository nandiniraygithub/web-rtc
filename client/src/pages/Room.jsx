import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import Controls from '../components/Controls'
import socket from '../utils/socket'
import usePeer from '../hooks/usePeer'
import './Room.css'

function Room() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [peers, setPeers] = useState([])
  const [mediaStream, setMediaStream] = useState(null)
  const localVideoRef = useRef(null)
  const { peer, peerId, createPeerConnection, answerCall } = usePeer()

  useEffect(() => {
    if (!peerId) return

    console.log('🎥 Joining room:', roomId, 'with peer ID:', peerId)
    socket.emit('join-room', { roomId, peerId })

    // Listen for new users
    socket.on('user-joined', ({ userId, peerId: remotePeerId }) => {
      console.log('👋 New user joined:', userId, 'peer ID:', remotePeerId)
      
      // Immediately show a placeholder for the new user
      setPeers(prev => {
        console.log('📹 Current peers before adding:', prev.length)
        const updated = [...prev.filter(p => p.id !== userId), { id: userId, stream: null }]
        console.log('📹 Current peers after adding:', updated.length)
        return updated
      })
      
      // Create connection to new user
      if (mediaStream) {
        console.log('🔗 Creating connection to:', remotePeerId)
        const call = createPeerConnection(remotePeerId, mediaStream)
        if (call) {
          call.on('stream', (remoteStream) => {
            console.log('📹 Got stream from new user:', remotePeerId)
            setPeers(prev => 
              prev.map(p => 
                p.id === userId ? { ...p, stream: remoteStream } : p
              )
            )
          })
        } else {
          console.log('❌ Failed to create call to:', remotePeerId)
        }
      } else {
        console.log('⏳ No media stream yet, waiting...')
      }
    })

    // Listen for incoming calls
    peer.on('call', (call) => {
      console.log('📞 Incoming call from:', call.peer)
      
      // Show placeholder for incoming caller
      setPeers(prev => {
        console.log('📹 Adding incoming caller:', call.peer)
        return [...prev.filter(p => p.id !== call.peer), { id: call.peer, stream: null }]
      })
      
      if (mediaStream) {
        console.log('📞 Answering call from:', call.peer)
        const answeredCall = answerCall(call, mediaStream)
        if (answeredCall) {
          answeredCall.on('stream', (remoteStream) => {
            console.log('📹 Received stream from:', call.peer)
            setPeers(prev => 
              prev.map(p => 
                p.id === call.peer ? { ...p, stream: remoteStream } : p
              )
            )
          })
        } else {
          console.log('❌ Failed to answer call from:', call.peer)
        }
      } else {
        console.log('⏳ No media stream yet for incoming call')
      }
    })

    // Listen for users leaving
    socket.on('user-left', (userId) => {
      console.log('👋 User left:', userId)
      setPeers(prev => prev.filter(p => p.id !== userId))
    })

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('user-joined')
      socket.off('user-left')
    }
  }, [roomId, peerId, mediaStream, peer])

  useEffect(() => {
    // Get user media
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setMediaStream(stream)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    startMedia()

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const leaveRoom = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
    }
    navigate('/')
  }

  const shareMeeting = () => {
    const meetingLink = `${window.location.origin}/room/${roomId}`
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert('Meeting link copied to clipboard!')
    })
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <div className="room-info">
          <h2>Room: {roomId}</h2>
          <button onClick={shareMeeting} className="share-btn">
            📋 Share
          </button>
        </div>
        <button onClick={leaveRoom} className="leave-btn">
          Leave Call
        </button>
      </div>
      
      <div className="videos-grid">
        <div className="video-wrapper">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="video-element"
          />
          <div className="video-label">You</div>
        </div>
        
        {peers.map(({ id, stream }) => (
          <VideoPlayer key={id} stream={stream} userId={id} />
        ))}
      </div>
      
      <Controls mediaStream={mediaStream} />
    </div>
  )
}

export default Room
