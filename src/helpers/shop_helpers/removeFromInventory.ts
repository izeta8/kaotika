export const removeFromInventory = (inventory, category, product) => {
    if (!inventory[category]) {
      return {
        success: false,
        message: 'The product category does not exist in the inventory.',
      };
    }
  
    const productIndex = inventory[category].findIndex(
      (item) => item._id.toString() === product._id
    );
  
    if (productIndex === -1) {
      return {
        success: false,
        message: 'The product is not in stock.',
      };
    }
  
    // Update quantity or remove product
    if (inventory[category][productIndex].quantity > 1) {
      inventory[category][productIndex].quantity -= 1;
    } else {
      inventory[category].splice(productIndex, 1); // Remove product if quantity is 1
    }
  
    return {
      success: true,
      inventory,
    };
  };