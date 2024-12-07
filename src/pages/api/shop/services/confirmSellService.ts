import { fetchPlayer } from './playersService';
import Player from '../../../../database/models/playerModel';

export const processProductSell = async (connection, playerEmail, product, productPrice) => {
  if (!playerEmail || !product || !product.value || !product._id) {
    throw new Error('Player email and complete product details are required');
  }

  const PlayerModel = connection.model('Player', Player.schema);

  let player = await fetchPlayer(connection, playerEmail);
  player = player.player;

  player.gold += productPrice;

  const category = product.type + 's';

  if (player.inventory[category]) {
    // Encontrar el producto en la categoría
    const productIndex = player.inventory[category].findIndex(
      (item) => item._id.toString() === product._id
    );

    if (productIndex > -1) {
      // Verificar si la cantidad es mayor que 1
      if (player.inventory[category][productIndex].quantity > 1) {
        // Decrementar la cantidad
        player.inventory[category][productIndex].quantity -= 1;
      } else {
        // Eliminar el producto si la cantidad es 1
        player.inventory[category].splice(productIndex, 1);
      }

    } else {
      return {
        success: false,
        message: 'The product is not in stock.',
      };
    }
  } else {
    return {
      success: false,
      message: 'The product category does not exist in the inventory.',
    };
  }

  const updatedPlayer = await PlayerModel.findOneAndUpdate(
    { email: playerEmail }, 
    { $set: { gold: player.gold, inventory: player.inventory } }, 
    { new: true } 
  );

  console.log(`Oro actualizado: ${updatedPlayer.gold}`);

  return {
    success: true,
    inventory: updatedPlayer.inventory,
    gold: updatedPlayer.gold,
  };
};
