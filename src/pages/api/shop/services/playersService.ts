import mongoose from 'mongoose';
import Player from '../../../../database/models/playerModel';
import  Ring  from '../../../../database/models/ringModel';
import  Armor  from '../../../../database/models/armorModel';
import  Artifact  from '../../../../database/models/artifactModel';
import  Boot  from '../../../../database/models/bootModel';
import  Helmet  from '../../../../database/models/helmetModel';
import  Ingredient  from '../../../../database/models/ingredientModel';
import  Shield  from '../../../../database/models/shieldModel';
import  Weapon  from '../../../../database/models/weaponModel';

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
      const ArmorModel = connection.model('Armor', Armor.schema);
      const WeaponModel = connection.model('Weapon', Weapon.schema);
      const ArtifactModel = connection.model('Artifact', Artifact.schema);
      const BootModel = connection.model('Boot', Boot.schema);
      const HelmetModel = connection.model('Helmet', Helmet.schema);
      const IngredientModel = connection.model('Ingredient', Ingredient.schema);
      const ShieldModel = connection.model('Shield', Shield.schema);
      const RingModel = connection.model('Ring', Ring.schema);
  
      // Fetch the player document
      const playerPop = await PlayerModel.findOne({ email: playerEmail }).exec();
      console.log("playerPop: " + playerPop.equipment); // Check if this has ObjectIds
      console.log(playerPop.inventory); // Check if this has ObjectIds
      const armor = await ArmorModel.findOne({name: "Tattered Cloak"})
      console.log("el armor: " + armor);
      const playerPopulated: any = await PlayerModel.findOne({ email: playerEmail }).populate('profile').exec();
      console.log("player populated: " + playerPopulated);
      const weapons = await WeaponModel.find().exec();
console.log("WeaponsTogo:", weapons);
const artifacts = await ArtifactModel.find().exec();
console.log("Artifacts:", artifacts);
      
  
      // Populate equipment using the models created with the specific connection
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
  