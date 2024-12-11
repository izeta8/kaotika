import mongoose, { Connection } from 'mongoose';
import { dbConfig } from './config';

export const createDatabaseConnection = async (): Promise<Connection | null> => {
  try {
    // Use mongoose.connect() for automatic reconnection handling
    await mongoose.connect(dbConfig.dbURI, {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection (5 seconds)
      socketTimeoutMS: 45000,  // Timeout for socket operations (45 seconds)
    });
    console.log('Successfully connected to MongoDB');
    return mongoose.connection;  // Return the mongoose connection object
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null; // Return null if connection fails
  }
};

// Gracefully close the database connection
export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('Closed MongoDB connection');
    } else {
      console.log('Connection is already closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

// // Listening to connection events for debugging
// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected');
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('MongoDB reconnected');
// });

// mongoose.connection.on('error', (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });
