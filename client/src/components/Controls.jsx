import { useState } from 'react'
import './Controls.css'

function Controls({ mediaStream }) {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

  const toggleMic = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMicOn(audioTrack.enabled)
      }
    }
  }

  const toggleCamera = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsCameraOn(videoTrack.enabled)
      }
    }
  }

  return (
    <div className="controls-container">
      <button
        onClick={toggleMic}
        className={`control-btn ${isMicOn ? 'active' : 'inactive'}`}
      >
        {isMicOn ? '🎤' : '🔇'}
        <span>{isMicOn ? 'Mic On' : 'Mic Off'}</span>
      </button>
      
      <button
        onClick={toggleCamera}
        className={`control-btn ${isCameraOn ? 'active' : 'inactive'}`}
      >
        {isCameraOn ? '📹' : '📷'}
        <span>{isCameraOn ? 'Camera On' : 'Camera Off'}</span>
      </button>
    </div>
  )
}

export default Controls
