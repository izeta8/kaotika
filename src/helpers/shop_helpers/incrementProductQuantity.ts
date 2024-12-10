export const incrementProductQuantity = (product: any, amount: number = 1) => {
  product.quantity = (product.quantity || 0) + amount;
};