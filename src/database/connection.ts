import mongoose, { Connection } from 'mongoose';
import { dbConfig } from './config';

export const createDatabaseConnection = async (): Promise<Connection | null> => {
  try {
    if (!dbConfig.dbURI) {
      throw new Error('Database URI is not defined in environment variables');
    }
    // Use mongoose.connect() for automatic reconnection handling
    await mongoose.connect(dbConfig.dbURI, {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection (5 seconds)
      socketTimeoutMS: 45000,  // Timeout for socket operations (45 seconds)
    });
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
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};
