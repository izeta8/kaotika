export const findExistingProduct = (categoryInventory: any[], productId: string) => {
  const foundProduct = categoryInventory.find((item) => item._id === productId);
  if (foundProduct) {
    return { _id: foundProduct._id };
  }
  return null;
};