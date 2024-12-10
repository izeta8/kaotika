import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { fetchPlayer, populatePlayer } from './services/playersService';

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

      console.log("el email pa feth: " + email);

      const playerData = await fetchPlayer(connection, email);

    //   console.log("el player fetcheado: " + JSON.stringify(playerData));

      if (!playerData?.player) {
          res.status(404).json({ message: `Player with email ${email} not found` });
          return;
      }

      const fullPlayer = await populatePlayer(connection, email);

      console.log("el player populado: " + fullPlayer.inventory);

      res.status(200).json(fullPlayer);
  } catch (error: any) {
      res.status(500).json({ message: 'Error fetching player', error: error.message });
  } finally {
      if (connection) {
          await closeDatabaseConnection(connection);
      }
  }
}