import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllProducts } from './services/productsService';
import mongoose from 'mongoose';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  let connection: mongoose.Connection | null = null
  try {
    connection = await createDatabaseConnection();
    if (!connection) {
      throw new Error('Database connection failed');
    }
    const allProducts = await fetchAllProducts(connection);
    res.status(200).json(allProducts);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  } finally {
    if (connection) {
      await closeDatabaseConnection();
    }
  }
}
