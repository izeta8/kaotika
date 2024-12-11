import { fetchPlayer, populatePlayer, updatePlayer } from './playersService';
import { calculateTotalCost } from '@/helpers/shop_helpers/calculateTotalCost';
import { hasEnoughGold } from '@/helpers/shop_helpers/hasEnoughGold';
import { addToInventory } from '@/helpers/shop_helpers/addToInventory';
import mongoose from 'mongoose';
import { findExistingProduct } from '@/helpers/shop_helpers/findExistingProduct';
import { CartItem } from '@/_common/interfaces/CartItem';

interface Player {
  _id: string;
  email: string;
  gold: number; // Ensure gold is typed as a number
  inventory: Record<string, string[]>, // Assuming ItemData is the correct type for items
  // other player properties
}

export const processProductsPurchase = async (connection: mongoose.Connection | null, playerEmail: string, products: CartItem[]) => {
  if (!playerEmail || !Array.isArray(products) || products.length === 0) {
    throw new Error('Player email and a non-empty products array are required');
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

  let player = playerData.player as unknown as Player; // Assuming fetchPlayer returns { player: {...} }

  // Calculate the total cost of all products
  const totalCost = calculateTotalCost(products);

  if (!hasEnoughGold(player.gold, totalCost)) {
    return {
      success: false,
      message: 'Insufficient funds',
    };
  }

  // Deduct the total cost from the player's gold
  player.gold -= totalCost;

  if(products[0].type != "ingredient"){
    if (findExistingProduct(player.inventory[products[0].type + "s"], products[0]._id)){
      return {
        success: false,
        message: 'Already in inventory',
      };
    }
  }
  
  // Update the inventory with the purchased products
  addToInventory(player.inventory, products);


  // Update the player document in the database
  await updatePlayer(connection, playerEmail, {
    gold: player.gold as number,
    inventory: player.inventory as object,
  });

  const populatedPlayer = await populatePlayer(connection, playerEmail);

  return {
    success: true,
    inventory: populatedPlayer.inventory,
    gold: populatedPlayer.gold,
  };
};

