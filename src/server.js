// Import required modules
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

// Define the port number for the server to listen on
const PORT = 4000;

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a Socket.IO server and pass the HTTP server instance to it
// Configure Socket.IO to allow Cross-Origin Resource Sharing (CORS)
const io = socketIo(server, {
  cors: {
    // Allow requests only from 'http://localhost:3000' origin
    origin: "http://localhost:3000",
    // Allow only specified HTTP methods (GET and POST)
    methods: ["GET", "POST"]
  }
});

// Event listener for when a client connects to the Socket.IO server
io.on('connection', (socket) => {
  // Log a message indicating that a user has connected
  console.log('A user connected');

  // Event listener for receiving messages from clients
  socket.on('sendMessage', (message) => {
    // Log the received message
    console.log('Message received:', message);
    // Broadcast the received message to all connected clients
    io.emit('message', message);
  });

  // Event listener for when a client disconnects from the server
  socket.on('disconnect', () => {
    // Log a message indicating that a user has disconnected
    console.log('A user disconnected');
  });
});

// Start the HTTP server and make it listen on the specified port
server.listen(PORT, () => {
  // Log a message indicating that the server is running and on which port
  console.log(`Server running on port ${PORT}`);
});
