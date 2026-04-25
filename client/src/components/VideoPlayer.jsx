import { useEffect, useRef } from 'react'

function VideoPlayer({ stream, userId }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  if (!stream) {
    return (
      <div className="video-wrapper">
        <div className="video-placeholder">
          <div className="user-avatar">{userId.slice(0, 2).toUpperCase()}</div>
          <div className="waiting-text">Joining...</div>
          <div className="connecting-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="video-label">User {userId.slice(0, 8)}</div>
      </div>
    )
  }

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="video-element"
      />
      <div className="video-label">User {userId.slice(0, 8)}</div>
    </div>
  )
}

export default VideoPlayer
