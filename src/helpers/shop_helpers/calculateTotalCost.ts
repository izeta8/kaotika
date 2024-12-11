import { CartItem } from "@/_common/interfaces/CartItem";

export const calculateTotalCost = (products: CartItem[]) => {
  return products.reduce((sum, product) => {
    if (!product.value || !product._id) {
      throw new Error('Each product must have a value and an _id');
    }
    
    const quantity = product.qty || 1; // Por si no viene el campo, usar 1 por defecto
    return sum + (product.value * quantity);
  }, 0);
};
