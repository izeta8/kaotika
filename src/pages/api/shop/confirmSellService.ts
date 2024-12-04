import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel'

export const processProductSell = async (connection, playerEmail, product, productPrice) => {
  if (!playerEmail || !product || !product.value || !product._id) {
    throw new Error('Player email and complete product details are required');
  }

  // Ensure that models are registered with the passed connection
  const PlayerModel = connection.model('Player', Player.schema);

  let player = await fetchPlayer(connection, playerEmail);

  player = player.player;
 

  // Add the value of the product when sell
  player.gold += productPrice;

   // Determine the category based on the product type
   const category = product.type + 's';

   // Ensure the category exists in the player's inventory
   if (!player.inventory[category]) {
     player.inventory[category] = []; // Initialize the category if it doesn't exist
   }

   // Check if the product is already in the specific category
   const existingProduct = player.inventory[category].find(
     (item) => item._id.toString() === product._id
   );

   if (existingProduct) {
     // If the product exists, increment the quantity
     existingProduct.quantity = (existingProduct.quantity || 1) + 1;
   } else {
     // If the product does not exist, add it to the category
     player.inventory[category].push({
       ...product, // Add all product details
       quantity: 1, // Initialize quantity
     });
   }

   const updatedPlayer = await PlayerModel.findOneAndUpdate(
    { email: playerEmail }, // Find the player by email
    { $set: { gold: player.gold, inventory: player.inventory } }, // Fields to update using the $set operator
    { new: true } // Return the updated document
  );

  console.log(updatedPlayer.gold);

  return {
    success: true,
    inventory: updatedPlayer.inventory,
    gold: updatedPlayer.gold,
  };
};