import mongoose from 'mongoose';
import Player from '../../../../database/models/playerModel';

export const fetchPlayer = async (connection: mongoose.Connection, playerEmail: string) => {
    try {
      
      // Ensure that models are registered with the passed connection
      const PlayerModel = connection.model('Demoplayer', Player.schema);
  
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
      const PlayerModel = connection.model('Demoplayer', Player.schema);
  
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

  export const populatePlayer = async (connection: mongoose.Connection, playerEmail: string) => {
    try {
      
      // Ensure that the models are created using the passed connection instance
      const PlayerModel = connection.model('Demoplayer', Player.schema);
  
      // Fetch the player document
      const playerPopulated: any = await PlayerModel.findOne({ email: playerEmail }).populate('profile').exec();
      
      if (playerPopulated) {
        // Populate equipment
      await playerPopulated.equipment.populate('armor');
      await playerPopulated.equipment.populate('weapon');
      await playerPopulated.equipment.populate('artifact');
      await playerPopulated.equipment.populate('ring');
      await playerPopulated.equipment.populate('helmet');
      await playerPopulated.equipment.populate('shield');
      await playerPopulated.equipment.populate('boot');

      // Populate inventory
      await playerPopulated.inventory.populate('helmets');
      await playerPopulated.inventory.populate('shields');
      await playerPopulated.inventory.populate('weapons');
      await playerPopulated.inventory.populate('boots');
      await playerPopulated.inventory.populate('rings');
      await playerPopulated.inventory.populate('armors');
      await playerPopulated.inventory.populate('artifacts');
      await playerPopulated.inventory.populate('ingredients');

      }
  
      return playerPopulated;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error populating player:', error);
        throw new Error(`Error populating player: ${error.message}`);
      } else {
        console.error('Unexpected error type:', error);
        throw new Error('An unexpected error occurred while populating player');
      }
    }
  };
  