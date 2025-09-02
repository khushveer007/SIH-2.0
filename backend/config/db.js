const mongoose = require('mongoose');

let isConnected = false;

function getMongoUri() {
  return process.env.MONGODB_URI;
}

async function connectDB() {
  const uri = getMongoUri();
  if (!uri) {
    console.warn('[DB] MONGODB_URI not set. Running without database connection.');
    return null;
  }
  if (isConnected) return mongoose.connection;
  try {
    await mongoose.connect(uri, {
      // Options can be added here if needed
    });
    isConnected = true;
    console.log(`[DB] Connected to MongoDB: ${mongoose.connection.name}`);
    return mongoose.connection;
  } catch (err) {
    console.error('[DB] Connection error:', err.message);
    throw err;
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[DB] MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[DB] MongoDB error:', err);
});

module.exports = { connectDB, getMongoUri, isConnected: () => isConnected };
