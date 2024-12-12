interface Inventory {
  [category: string]: string[];
}
type ProductId = string;
type Category = string;
type Quantity = number;


export const removeFromInventory = (inventory: Inventory, category: Category, productId: ProductId, productQuantity: Quantity) => {
  if (!inventory[category]) {
    return {
      success: false,
      message: 'The product category does not exist in the inventory.',
    };
  }


  for (let i = 0; i < productQuantity; i++) {
    // Find the index of the product ID in the category array
    const productIndex = inventory[category].indexOf(productId);

    if (productIndex === -1) {
      return {
        success: false,
        message: 'The product is not in stock.',
      };
    }

    // Remove the product ID from the array
    inventory[category].splice(productIndex, 1);

  }



  return {
    success: true,
    inventory,
  };
};
