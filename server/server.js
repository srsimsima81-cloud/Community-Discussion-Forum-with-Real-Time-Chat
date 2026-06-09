const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const discussionRoutes =
require("./routes/discussionRoutes");

const commentRoutes =
require("./routes/commentRoutes");

const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const Message = require("./models/Message");

const messageRoutes =
require("./routes/messageRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/discussions",
  discussionRoutes
);
// Test Route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Community Forum Backend is Running 🚀",
  });
});

app.use(
  "/api/comments",
  commentRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});



const onlineUsers = new Map(); // socket.id → username

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // JOIN ROOM
  socket.on("joinRoom", (data) => {
    const { room, userName } = data;

    socket.join(room);
    socket.userName = userName;

    if (userName) {
      onlineUsers.set(socket.id, userName);
    }

    // send updated user list
    io.emit("onlineUsers", Array.from(onlineUsers.values()));

    console.log(`${userName} joined ${room}`);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async (data) => {
    const messageData = {
      room: data.room,
      message: data.message,
      sender: socket.userName || "Guest",
      time: data.time,
    };

    try {
      await Message.create(messageData);

      io.to(data.room).emit("receiveMessage", messageData);
    } catch (err) {
      console.log(err.message);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);

    io.emit("onlineUsers", Array.from(onlineUsers.values()));

    console.log("User Disconnected:", socket.id);
  });
});
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed ❌", err.message);
  });