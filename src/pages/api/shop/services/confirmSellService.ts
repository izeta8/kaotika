import { ItemData } from '@/_common/interfaces/ItemData';
import { fetchPlayer, populatePlayer, updatePlayer } from './playersService';
import { removeFromInventory } from '@/helpers/shop_helpers/removeFromInventory';
import mongoose from 'mongoose';

interface Player {
  _id: string;
  email: string;
  gold: number;
  inventory: Record<string, string[]>,
}
import { changeProductActiveStatus } from './changeActiveService';


export const processProductSell = async (connection: mongoose.Connection | null, playerEmail: string, product: ItemData, productPrice: number) => {
  if (!playerEmail || !product || !product.value || !product._id) {
    throw new Error('Player email and complete product details are required');
  }

  if (!connection) {
    return {
      success: false,
      message: 'Database connection is not available',
    };
  }

  let playerData = await fetchPlayer(connection, playerEmail);

  // Handle the case where player is null or doesn't exist
  if (!playerData || !playerData.player) {
    return {
      success: false,
      message: 'Player not found',
    };
  }

  let player = playerData.player as unknown as Player;

  // Increase player's gold by the product price
  player.gold += productPrice;

  // Determine the product category (e.g., 'weapons', 'armors')
  const category = product.type + 's';

  // Remove the product from the player's inventory
  const inventoryUpdateResult = removeFromInventory(player.inventory, category, product._id);

  if (!inventoryUpdateResult.success) {
    return inventoryUpdateResult; // Return the failure message
  }

  // Update the player's data in the database using the updatePlayer helper
  const updatedPlayer = await updatePlayer(connection, playerEmail, {
    gold: player.gold,
    inventory: inventoryUpdateResult.inventory,
  });

  const populatedPlayer = await populatePlayer(connection, playerEmail);

  

  if (product.isUnique) {  
    await changeProductActiveStatus(connection, product, true);
  }

  return {
    success: true,
    inventory: populatedPlayer.inventory,
    gold: populatedPlayer.gold,
  };
};
