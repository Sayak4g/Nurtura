// index.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import { app } from "./app.js";
import connectDB from "./DB/index.js";

// Load env vars
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

// Create HTTP server from Express app
const server = createServer(app);

// Setup Socket.io
const io = new SocketIO(server, {
  cors: {
    origin: "*", // Allow all origins (change for prod)
    methods: ["GET", "POST"]
  }
});

// WebRTC Signaling Events
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
