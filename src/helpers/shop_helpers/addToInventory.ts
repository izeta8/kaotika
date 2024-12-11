import { findExistingProduct } from "./findExistingProduct";
import { incrementProductQuantity } from "./incrementProductQuantity";


export const addToInventory = (
  playerInventory: Record<string, string[]>, // Inventory with only IDs
  products: Array<{ _id: string, type: string }>
) => {
  console.log("The inventory:", playerInventory);
  console.log("The products:", JSON.stringify(products));

  products.forEach((product) => {
    const category = product.type + 's'; // Determine the category (e.g., 'ingredients')

    // Initialize the category if it doesn't exist
    if (!playerInventory[category]) {
      playerInventory[category] = [];
    }

    // Add the product ID to the category
    playerInventory[category].push(product._id);
  });

  console.log("Updated inventory:", playerInventory);
};