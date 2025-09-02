const express = require('express');
require('dotenv').config();
const { connectDB, isConnected } = require('./config/db');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Attempt DB connection (non-blocking if fails)
(async () => {
  try {
    await connectDB();
  } catch (e) {
    console.error('[Startup] Database connection failed, continuing without DB.');
  }
})();

// Middleware for JSON parsing
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: isConnected() ? 'connected' : 'disconnected' });
});

// DB status endpoint
app.get('/db-status', (req, res) => {
  res.json({ connected: isConnected() });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Test endpoint for JSON parsing
app.post('/echo', (req, res) => {
  res.json({
    received: true,
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});