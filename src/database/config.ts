import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  dbURI: process.env.DB_URI,
};
