import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { processProductSell } from './services/confirmSellService';
import { NextApiRequest, NextApiResponse } from 'next';

interface SellResult {
  success: boolean;
  message?: string;
  inventory?: any;
  gold?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { playerEmail, product, productPrice } = req.body;
  let connection = null;

  try {
    connection = await createDatabaseConnection();

    // Ensure the result is typed as SellResult
    const result: SellResult = await processProductSell(connection, playerEmail, product, productPrice);

    // Handle cases where message might not be available
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Sell successful',
        inventory: result.inventory,
        gold: result.gold,
      });
    } else {
      // If message exists, send it back
      return res.status(200).json({
        success: false,
        message: result.message || 'An unknown error occurred', // Fallback to default message
      });
    }
  } catch (error) {
    console.error('Error processing sell:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) {
      await closeDatabaseConnection();
    }
  }
}

