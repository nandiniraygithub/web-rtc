const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict this
    methods: ["GET", "POST"],
  },
});

// When user connects
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // User joins a room
  socket.on("join-room", (data) => {
    const { roomId, peerId } = data;
    socket.join(roomId);
    console.log(`🏠 User ${socket.id} with peer ID ${peerId} joined room ${roomId}`);

    // Get all users in room
    const roomUsers = io.sockets.adapter.rooms.get(roomId);
    console.log(`👥 Users in room ${roomId}:`, roomUsers ? Array.from(roomUsers) : []);

    // Notify others in room
    socket.to(roomId).emit("user-joined", { userId: socket.id, peerId });
    console.log(`📢 Notified room ${roomId} about new user ${socket.id}`);

    // When user disconnects
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      socket.to(roomId).emit("user-left", socket.id);
    });
  });

  // Debug: Listen for any socket events
  socket.onAny((eventName, ...args) => {
    console.log(`🔍 Socket event: ${eventName}`, args);
  });
});

server.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Server running on port 5000 - Accessible globally!");
  console.log("📱 Local: http://localhost:5000");
  console.log("🌍 Network: http://YOUR_IP:5000");
});
