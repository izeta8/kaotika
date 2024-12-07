import mongoose from 'mongoose';
import Player from '../../../../database/models/playerModel'

export const fetchPlayer = async (connection: mongoose.Connection, playerEmail: string) => {
    try {
      
      // Ensure that models are registered with the passed connection
      const PlayerModel = connection.model('Player', Player.schema);
  
      // Fetch data from the models
      const player = await PlayerModel.findOne({ email: playerEmail }).exec();
  
      return {
        player
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching palyer:', error);
        throw new Error(`Error fetching player: ${error.message}`);
      } else {
        console.error('Unexpected error type:', error);
        throw new Error('An unexpected error occurred while fetching player');
      }
    }
  };

  export const updatePlayer = async (
    connection: mongoose.Connection,
    playerEmail: string,
    updates: Record<string, any> // Flexible type for updates
  ) => {
    try {
      // Ensure that models are registered with the passed connection
      const PlayerModel = connection.model('Player', Player.schema);
  
      // Update the player document
      const updatedPlayer = await PlayerModel.findOneAndUpdate(
        { email: playerEmail }, // Find the player by email
        { $set: updates }, // Use $set to apply updates safely
        { new: true } // Return the updated document
      ).exec();
      
      return {
        updatedPlayer,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating player:', error);
        throw new Error(`Error updating player: ${error.message}`);
      } else {
        console.error('Unexpected error type:', error);
        throw new Error('An unexpected error occurred while updating player');
      }
    }
  };