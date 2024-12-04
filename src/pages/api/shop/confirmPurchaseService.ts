import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel';

export const processProductsPurchase = async (connection, playerEmail, products) => {
  if (!playerEmail || !Array.isArray(products) || products.length === 0) {
    throw new Error('Player email and a non-empty products array are required');
  }

  // Ensure that models are registered with the passed connection
  const PlayerModel = connection.model('Player', Player.schema);

  let player = await fetchPlayer(connection, playerEmail);

  player = player.player; // Assuming fetchPlayer returns { player: {...} }
  products = products[0];

  console.log("todos los productos: " + JSON.stringify(products[0]));
  // Calculate the total cost of all products
  const totalCost = products.reduce((sum, product) => {
    if (!product.value || !product._id) {
      throw new Error('Each product must have a value and an _id');
    }
    return sum + product.value;
  }, 0);

  // Check if the player has enough gold for all products
  if (player.gold < totalCost) {
    return {
      success: false,
      message: 'Insufficient funds',
    };
  }

  // Deduct the total cost from the player's gold
  player.gold -= totalCost;

  // Update the inventory with the purchased products
  products.forEach((product) => {
    const category = product.type + 's'; // Determine the category based on the product type

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
  });

  // Update the player document in the database
  const updatedPlayer = await PlayerModel.findOneAndUpdate(
    { email: playerEmail }, // Find the player by email
    { $set: { gold: player.gold, inventory: player.inventory } }, // Fields to update using the $set operator
    { new: true } // Return the updated document
  );

  return {
    success: true,
    inventory: updatedPlayer.inventory,
    gold: updatedPlayer.gold,
  };
};

