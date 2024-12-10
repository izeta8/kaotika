import { findExistingProduct } from "./findExistingProduct";
import { incrementProductQuantity } from "./incrementProductQuantity";


export const addToInventory = (playerInventory: Record<string, any[]>, products: Array<{ _id: string, type: string, quantity: number }>) => {
  
  console.log("the inventory: " + playerInventory);
  console.log("the products of here " + JSON.stringify(products));
    products.forEach((product) => {
      
      const category = product.type + 's'; 
  
      if (!playerInventory[category]) {
        playerInventory[category] = []; // Initialize the category if it doesn't exist
      }
     const existingProduct = findExistingProduct(playerInventory[category], product._id);

     if (existingProduct) {
       if (category === "ingredients") {
         incrementProductQuantity(existingProduct, product.quantity);
       } else {
         incrementProductQuantity(existingProduct, 1);
       }
     } else {
       playerInventory[category].push({
         ...product, 
         quantity: category === "ingredients" ? product.quantity : 1, 
       });
     }
   });
  };