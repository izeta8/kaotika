import mongoose, { Connection } from 'mongoose';
import { dbConfig } from './config';

export const createDatabaseConnection = async (): Promise<Connection> => {
  try {
    const connection = await mongoose.createConnection(dbConfig.dbURI, {});
    if (!connection) {throw new Error("Error connecting to Mongo")}
    console.log('Created a new MongoDB connection');
    return connection;
  } catch (error) {
    console.error('Error creating MongoDB connection:', error);
    throw error;
  }
};

export const closeDatabaseConnection = async (connection: Connection): Promise<void> => {
  try {
    if (connection.readyState !== 0) {
      await connection.close();
      console.log('Closed isolated MongoDB connection');
    } else {
      console.log('Connection was already closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};
