import mongoose from 'mongoose';
import { dbConfig } from './config.js';

mongoose.connect(dbConfig.dbURI, dbConfig.options)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

export default mongoose;

