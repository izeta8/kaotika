import { CartItem } from "@/_common/interfaces/CartItem";

export const addToInventory = (
  playerInventory: Record<string, string[]>, // Inventory with only IDs
  products: CartItem[]
) => {
  products.forEach((product) => {
    const category = product.type + 's'; // Determine the category (e.g., 'ingredients')

    // Initialize the category if it doesn't exist
    if (!playerInventory[category]) {
      playerInventory[category] = [];
    }

    const quantity = product.qty || 1;
    for (let i = 0; i < quantity; i++) {
      playerInventory[category].push(product._id);
    }
  });
};



