const mongoose = require('mongoose');
const env = require('./env');


async function connectToDatabase() {
  return new Promise((resolve, reject) => {
    try {
      const conn = mongoose.createConnection(env.DB_URL);
      
      conn.on('connected', () => {
        resolve(conn);
      });

      conn.on('error', (err) => {
        console.error('Error connecting to the database:', err);
        reject(err);
      });
    } catch (error) {
      console.error('Error creating connection:', error);
      reject(error);
    }
  });
}



// Function to disconnect from the database
async function disconnectFromDatabase(conn) {
  return new Promise((resolve, reject) => {
    try {
      conn.on('disconnected', () => {
        resolve();
      });

      conn.close();
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
      reject(error);
    }
  });
}



module.exports = {connectToDatabase,disconnectFromDatabase} ;
