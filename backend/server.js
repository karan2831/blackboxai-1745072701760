const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Simulated real-time data stream
function generateRandomEvent() {
  const events = [
    { type: 'port_scan', severity: 'medium', description: 'Port scanning detected from IP 192.168.1.10' },
    { type: 'brute_force', severity: 'high', description: 'Brute force login attempt detected on user admin' },
    { type: 'ddos', severity: 'high', description: 'DDoS attack detected from multiple IPs' },
    { type: 'malware', severity: 'high', description: 'Malware signature detected in file upload' },
    { type: 'phishing', severity: 'medium', description: 'Phishing email detected targeting finance department' },
    { type: 'insider_threat', severity: 'high', description: 'Unusual data access pattern detected for user john.doe' },
  ];
  return events[Math.floor(Math.random() * events.length)];
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  const interval = setInterval(() => {
    const event = generateRandomEvent();
    socket.emit('threat_event', event);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

app.get('/', (req, res) => {
  res.send('Threat Detection Backend API is running');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
