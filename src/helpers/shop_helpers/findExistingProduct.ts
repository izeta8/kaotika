export const findExistingProduct = (categoryInventory: any[], productId: string) => {
  const foundProduct = categoryInventory.find((item) => item === productId);
  if (foundProduct) {
    return foundProduct;
  }
  return null;
};