import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { processProductsPurchase } from '../shop/confirmPurchaseService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let connection = null;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { playerEmail, products } = req.body;

  if (!playerEmail) {
    throw new Error('Player email is required');
  }

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A non-empty products array is required');
  }

  try {
    
    connection = await createDatabaseConnection();

    const updatedPlayer = await processProductsPurchase(connection, playerEmail, products);

    // Handle successful purchase
    res.status(200).json({
      success: true,
      updatedPlayerData: updatedPlayer
    });

  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, error: error?.message });
  } finally {
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  }
}

