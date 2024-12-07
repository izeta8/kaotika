import mongoose from 'mongoose';
import Player from '../../../database/models/playerModel'

export const fetchPlayer = async (connection: mongoose.Connection, playerEmail: string) => {
    try {
      
      // Ensure that models are registered with the passed connection
      const PlayerModel = connection.model('Player', Player.schema);
  
      // Fetch data from the models
      const player = await PlayerModel.findOne({ email: playerEmail }).exec();
  
      if (!player) {throw new Error('Error getting player from the database')}

      return {
        player
      };
    } catch (error: any) {
      console.log('Error: ' + error?.message);
      throw error;
    }
  };