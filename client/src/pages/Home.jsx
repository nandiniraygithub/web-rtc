import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [roomId, setRoomId] = useState('')
  const [createdRoomId, setCreatedRoomId] = useState('')
  const [showShareSuccess, setShowShareSuccess] = useState(false)
  const navigate = useNavigate()

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9)
    setCreatedRoomId(newRoomId)
    navigate(`/room/${newRoomId}`)
  }

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`)
    }
  }

  const copyMeetingLink = () => {
    const meetingLink = `${window.location.origin}/room/${createdRoomId}`
    navigator.clipboard.writeText(meetingLink).then(() => {
      setShowShareSuccess(true)
      setTimeout(() => setShowShareSuccess(false), 2000)
    })
  }

  const copyRoomCode = () => {
    navigator.clipboard.writeText(createdRoomId).then(() => {
      setShowShareSuccess(true)
      setTimeout(() => setShowShareSuccess(false), 2000)
    })
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Video Meet</h1>
        <p>Simple video meetings for everyone</p>
        
        <div className="actions">
          <button onClick={createRoom} className="btn btn-primary">
            Create Meeting
          </button>
          
          <div className="divider">OR</div>
          
          <div className="join-section">
            <input
              type="text"
              placeholder="Enter meeting code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
              className="room-input"
            />
            <button onClick={joinRoom} className="btn btn-secondary">
              Join
            </button>
          </div>
        </div>

        {createdRoomId && (
          <div className="share-section">
            <h3>Meeting Created!</h3>
            <div className="meeting-info">
              <div className="room-code-display">
                <span className="code-label">Meeting Code:</span>
                <span className="code-value">{createdRoomId}</span>
                <button onClick={copyRoomCode} className="copy-btn">
                  📋
                </button>
              </div>
              <div className="meeting-link">
                <span className="link-label">Share Link:</span>
                <input
                  type="text"
                  value={`${window.location.origin}/room/${createdRoomId}`}
                  readOnly
                  className="link-input"
                />
                <button onClick={copyMeetingLink} className="copy-btn">
                  📋
                </button>
              </div>
            </div>
            {showShareSuccess && (
              <div className="success-message">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
