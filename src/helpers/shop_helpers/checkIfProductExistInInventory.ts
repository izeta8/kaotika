import { findExistingProduct } from "./findExistingProduct";

export const checkIfProductsExistInInventory = (player: any, products: any[]) => {
  for (const product of products) {
    if (product.type !== 'ingredient') {
      const category = product.type + 's';
      if (player.inventory && player.inventory[category]) {
        const trimmedCategoryInventory = player.inventory[category].map((item: any) => {
          const itemAsString = item.toString ? item.toString().trim() : String(item).trim();
          return itemAsString;
        });
        if (findExistingProduct(trimmedCategoryInventory, String(product._id))) {
          return true;
        }
      }
    }
  }
  return false;
};
