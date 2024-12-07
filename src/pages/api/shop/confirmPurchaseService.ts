import { fetchPlayer, updatePlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel';
import { calculateTotalCost } from '@/helpers/shop_helpers/calculateTotalCost';
import { hasEnoughGold } from '@/helpers/shop_helpers/hasEnoughGold';
import { addToInventory } from '@/helpers/shop_helpers/addToInventory';


export const processProductsPurchase = async (connection, playerEmail, products) => {
  if (!playerEmail || !Array.isArray(products) || products.length === 0) {
    throw new Error('Player email and a non-empty products array are required');
  }

  // Ensure that models are registered with the passed connection
  const PlayerModel = connection.model('Player', Player.schema);

  let player = await fetchPlayer(connection, playerEmail);

  player = player.player; // Assuming fetchPlayer returns { player: {...} }
  // console.log("el player: " + JSON.stringify(player));
  // console.log("los productos: " + JSON.stringify(products));

  console.log("el player que me interesa: " + player);

  // Calculate the total cost of all products
  const totalCost = calculateTotalCost(products);

  // Check if the player has enough gold for all products
  if (!hasEnoughGold(player.gold, totalCost)) {
    return {
      success: false,
      message: 'Insufficient funds',
    };
  }

  // Deduct the total cost from the player's gold
  player.gold -= totalCost;

  // Update the inventory with the purchased products
  addToInventory(player.inventory, products);

  // Update the player document in the database
  const updatedPlayer = await updatePlayer(connection, playerEmail, {
    gold: player.gold as number,
    inventory: player.inventory as object,
  });

  return {
    success: true,
    inventory: updatedPlayer.updatedPlayer.inventory,
    gold: updatedPlayer.updatedPlayer.gold,
  };
};

