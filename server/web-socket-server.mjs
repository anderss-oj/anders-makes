import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT || 3001; // Choose a different port for the WebSocket server
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://anders-makes.com'],  // Update the origin to match your client
    methods: ['GET', 'POST']
  }
});

let canvasState = {
  dots: [],
  symbols: []
};

io.on('connection', (socket) => {
  console.log('Socket.IO connection opened');

  // Send the initial canvas state to the client
  socket.emit('canvasState', canvasState);

  socket.on('canvasState', (data) => {
    console.log('Received canvas state:', data);

    // Update the canvas state on the server
    canvasState = data;

    // Broadcast the updated canvas state to all connected clients
    socket.broadcast.emit('canvasState', canvasState);
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO connection closed');
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
