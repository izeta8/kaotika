export const incrementProductQuantity = (product: any) => {
    product.quantity = (product.quantity || 1) + 1;
  };