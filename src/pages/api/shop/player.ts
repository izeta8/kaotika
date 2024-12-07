import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { fetchPlayer } from './services/playersService';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { playerEmail } = req.query; // Extract playerEmail from query parameters
  let connection: mongoose.Connection | null = null;

  try {
    connection = await createDatabaseConnection();
    if (!connection) {
      throw new Error('Database connection failed');
    }

    // Validate playerEmail
    if (!playerEmail || (Array.isArray(playerEmail) && playerEmail.length === 0)) {
      res.status(400).json({ message: 'Missing or invalid playerEmail in query parameters' });
      return;
    }

    // Normalize playerEmail to a string
    const email = Array.isArray(playerEmail) ? playerEmail[0] : playerEmail;

    const player = await fetchPlayer(connection, email);

    console.log("cual es el player?: " + JSON.stringify(player));
    if (player?.player === null || player?.player === undefined) {
      res.status(404).json({ message: `Player with email ${email} not found` });
      return;
    }
    res.status(200).json(player);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching player', error: error.message });
  } finally {
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  }
}
