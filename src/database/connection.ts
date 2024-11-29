import mongoose from 'mongoose';
import { dbConfig } from './config';

// TypeScript requires the `dbConfig` to have the correct types for `dbURI` and `options`.
interface DbConfig {
  dbURI: string;
  options: mongoose.ConnectOptions;
}

const config: DbConfig = dbConfig;

mongoose.connect(config.dbURI, config.options)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

export default mongoose;

