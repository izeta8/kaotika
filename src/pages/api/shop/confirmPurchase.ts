import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { processProductPurchase } from '../shop/confirmPurchaseService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { playerEmail, product } = req.body;
  let connection = null;

  try {
    connection = await createDatabaseConnection();

    const result = await processProductPurchase(connection, playerEmail, product);

    if (!result.success) {
        // Return success: false status to the client with the error message
        return res.status(200).json({
          success: false,
          message: result.message,
        });
    }

    // Handle successful purchase
    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      inventory: result.inventory,
      money: result.gold,
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  }
}

