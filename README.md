# Community Forum (MERN + Socket.io)

A real-time community discussion and chat platform built using the MERN stack with Socket.io support. Users can create discussions, comment, chat in real time, and manage their own posts with authentication.

---

## Features

* User authentication (Login / Register with JWT)
* Create, edit, and delete discussions
* Comment system per discussion
* Real-time chat room using Socket.io
* Online users tracking
* Upvote system for discussions
* Protected routes for authenticated actions

---

## Tech Stack

Frontend: React, React Router, Axios, Socket.io-client, TailwindCSS
Backend: Node.js, Express.js, Socket.io
Database: MongoDB Atlas, Mongoose
Authentication: JWT (JSON Web Token)

---

## Project Structure

project-root/
client/
src/
components/
pages/
layouts/
socket.js
App.js
server/
controllers/
models/
routes/
middleware/
server.js
.env
README.md

---

## Installation & Setup

### 1. Clone the repository

git clone <your-repo-url>

### 2. Backend setup

cd server
npm install
Create a .env file inside server folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend server:

npm start

### 3. Frontend setup

cd client
npm install
npm start

---

## Environment Variables

Server requires:

MONGO_URI → MongoDB Atlas connection string
JWT_SECRET → Secret key for authentication
PORT → Backend port (default 5000)

---

## API Routes

Auth Routes:
/api/auth/register
/api/auth/login

Discussion Routes:
/api/discussions
/api/discussions/:id
/api/discussions/:id/upvote

Comment Routes:
/api/comments
/api/comments/:id

Message Routes:
/api/messages/:room

---

## Socket Events

Client → Server:
joinRoom
sendMessage

Server → Client:
receiveMessage
onlineUsers

---

## Key Functional Flow

* User logs in → token stored in localStorage
* Dashboard loads discussions from backend
* Clicking “View” opens full discussion page
* Comments are fetched and posted via API
* Chat room connects via Socket.io
* Messages broadcast in real time to room users

---

## Future Improvements

* Pagination for discussions
* Typing indicator in chat
* Message deletion/editing
* Profile pages for users
* Notification system
* Rich text editor for posts

---




