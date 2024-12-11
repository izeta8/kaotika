export const incrementProductQuantity = (product: any, amount: number = 1) => {
  product.qty = (product.qty || 0) + amount;
};