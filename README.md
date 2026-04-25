# 🎥 Video Meet App

A Google Meet-like video calling application built with React, WebRTC, and Socket.IO.

## ✨ Features

- 📹 **Video Calling** - Real-time peer-to-peer video calls
- 🎤 **Audio Controls** - Mute/unmute microphone
- 📷 **Camera Controls** - Turn camera on/off
- 🔗 **Easy Sharing** - Share meeting links or codes
- 🌍 **Global Access** - Works across devices on your network
- 👥 **Multiple Users** - See all participants in a grid layout

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:nandiniraygithub/web-rtc.git
   cd web-rtc
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the App

1. **Start the server**
   ```bash
   cd server
   node server.js
   ```

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create a meeting or join with a code

## 📱 Usage

### Creating a Meeting
1. Click "Create Meeting"
2. Copy the meeting link or code
3. Share it with others

### Joining a Meeting
1. Enter a meeting code
2. Click "Join"
3. Allow camera/microphone access

### During a Call
- 🎤 Toggle microphone on/off
- 📷 Toggle camera on/off
- 📋 Share meeting link with others
- 🚪 Leave call when done

## 🌐 Global Sharing

To share with others on your network:

1. **Get your IP address**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. **Share the link**
   ```
   http://YOUR_IP:5173/room/MEETING_CODE
   ```

## 🏗️ Project Structure

```
video-meet-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Home and Room pages
│   │   ├── components/  # VideoPlayer, Controls
│   │   ├── hooks/       # WebRTC logic
│   │   └── utils/       # Socket connection
│   └── package.json
├── server/              # Backend server
│   ├── server.js        # Socket.IO server
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Socket.IO
- **Video**: WebRTC, PeerJS
- **Styling**: CSS3, Animations

## 🔧 Development

### Server
- Handles Socket.IO connections
- Manages room creation/joining
- Signals WebRTC peer connections

### Client
- React components for UI
- WebRTC peer-to-peer video
- Real-time socket communication

## 🐛 Troubleshooting

### Camera/Microphone Not Working
- Ensure browser permissions are granted
- Check if other apps are using the camera
- Try refreshing the page

### Connection Issues
- Check both server and client are running
- Verify network connectivity
- Check browser console for errors

### Port Conflicts
- Kill existing processes: `lsof -ti:5000 | xargs kill -9`
- Use different ports if needed

## 📄 License

MIT License - feel free to use this project for your own video calling needs!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for seamless video communication
