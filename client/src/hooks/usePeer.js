import { useEffect, useRef, useState } from 'react'
import { Peer } from 'peerjs'

export default function usePeer() {
  const [peer, setPeer] = useState(null)
  const [peerId, setPeerId] = useState(null)

  useEffect(() => {
    console.log('🔧 Initializing PeerJS...')
    const myPeer = new Peer()
    
    myPeer.on('open', (id) => {
      console.log('✅ My peer ID is:', id)
      setPeerId(id)
      setPeer(myPeer)
    })

    myPeer.on('error', (error) => {
      console.error('❌ PeerJS error:', error)
    })

    myPeer.on('close', () => {
      console.log('🔌 PeerJS connection closed')
    })

    return () => {
      if (myPeer) {
        console.log('🗑️ Destroying PeerJS instance')
        myPeer.destroy()
      }
    }
  }, [])

  const createPeerConnection = (remotePeerId, stream) => {
    if (!peer || !stream) return null
    
    const call = peer.call(remotePeerId, stream)
    return call
  }

  const answerCall = (call, stream) => {
    if (!stream) return null
    call.answer(stream)
    return call
  }

  return {
    peer,
    peerId,
    createPeerConnection,
    answerCall
  }
}
