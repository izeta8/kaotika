import { findExistingProduct } from "./findExistingProduct";
import { incrementProductQuantity } from "./incrementProductQuantity";


export const addToInventory = (playerInventory: Record<string, any[]>, products: Array<{ _id: string, type: string }>) => {
  
  console.log("the inventory: " + playerInventory);
  console.log("the products of here " + JSON.stringify(products));
    products.forEach((product) => {
      
      const category = product.type + 's'; // Determine the category based on the product type
  
      // Ensure the category exists in the player's inventory
      if (!playerInventory[category]) {
        playerInventory[category] = []; // Initialize the category if it doesn't exist
      }
  
      // Check if the product is already in the specific category
      const existingProduct = findExistingProduct(playerInventory[category], product._id);
  
      if (existingProduct) {
        // If the product exists, increment the quantity
        incrementProductQuantity(existingProduct);
      } else {
        // If the product does not exist, add it to the category
        playerInventory[category].push({
          ...product, // Add all product details
          quantity: 1, // Initialize quantity
        });
      }
    });
  };