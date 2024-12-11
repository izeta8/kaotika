import { fetchPlayer, populatePlayer, updatePlayer } from './playersService';
import { removeFromInventory } from '@/helpers/shop_helpers/removeFromInventory';
import { changeProductActiveStatus } from './changeActiveService';


export const processProductSell = async (connection, playerEmail, product, productPrice) => {
  if (!playerEmail || !product || !product.value || !product._id) {
    throw new Error('Player email and complete product details are required');
  }

  let player = await fetchPlayer(connection, playerEmail);
  player = player.player;

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

  

  if (!product.isUnique) {  
    await changeProductActiveStatus(connection, product, false);
  }

  return {
    success: true,
    inventory: populatedPlayer.inventory,
    gold: populatedPlayer.gold,
  };
};
