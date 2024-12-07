import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel';
import { Connection } from 'mongoose';
import { CartItem } from '@/_common/interfaces/CartItem';

export const processProductsPurchase = async (connection: Connection, playerEmail: string, products: CartItem[]) => {
 
  try {
     
    console.log("---- processProductsPurchase ----")

    // Ensure that models are registered with the passed connection
    const PlayerModel = connection.model('Player', Player.schema);

    let player = await fetchPlayer(connection, playerEmail);

    // Calculate the total cost of all products
    const totalCost = calculateTotalCost(products);

    // Check if the player has enough gold for all products
    if (player.gold < totalCost) {throw new Error("Insufficient money")}

    // Deduct the total cost from the player's gold
    player.gold -= totalCost;

    // Update the inventory with the purchased products
    player = updateInventory(player, products);

    // Update the player document in the database
    const updatedPlayer = await PlayerModel.findOneAndUpdate(
      { email: playerEmail }, // Find the player by email
      { $set: { gold: player.gold, inventory: player.inventory } }, // Fields to update using the $set operator
      { new: true } // Return the updated document
    );

    return updatedPlayer;

  } catch (error) {
    throw error;
  }

};

const calculateTotalCost = (products: CartItem[]) =>
  products.reduce((sum, product) => {
    if (!product.value || !product._id) {
      throw new Error('Each product must have a value and an _id');
    }
    return sum + product.value;
  }, 0);

const updateInventory = (player, products: CartItem[]) => {

  products.forEach((product) => {
    const category = product.type + 's'; // Determine the category based on the product type

    // Ensure the category exists in the player's inventory
    if (!player.inventory[category]) {
      player.inventory[category] = []; // Initialize the category if it doesn't exist
    }

    // Check if the product is already in the specific category
    const existingProduct = player.inventory[category].find(
      (item: CartItem) => item._id.toString() === product._id
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

  return player;
}