import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel'

export const processProductPurchase = async (connection, playerEmail, product) => {
  if (!playerEmail || !product || !product.value || !product._id) {
    throw new Error('Player email and complete product details are required');
  }

  // Ensure that models are registered with the passed connection
  const PlayerModel = connection.model('Player', Player.schema);

  let player = await fetchPlayer(connection, playerEmail);

  player = player.player; //////////PORQUE PLAYER.PLAYER?????

  // Check if the player's level is sufficient for the product
  if (player.level < product.min_lvl) {
    return {
      success: false,
      message: 'Player level is too low to purchase this product',
    };
  }

  // Check if the player has enough money
  if (player.gold < product.value) {
    return {
      success: false,
      message: 'Insufficient funds',
    };
  }

  // Deduct the product price from the player's money
  player.gold -= product.value;

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
