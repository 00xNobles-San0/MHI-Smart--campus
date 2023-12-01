const mongoose = require('mongoose');
const env = require('./env');


async function connectToDatabase() {
  try {
    const conn = await mongoose.connect(env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    return conn
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
// Connection event
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

// Disconnection event
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});

// Error event
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});


module.exports = connectToDatabase ;
