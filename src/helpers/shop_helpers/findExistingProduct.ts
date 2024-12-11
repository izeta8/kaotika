export const findExistingProduct = (categoryInventory: any[], productId: string) => {
  return categoryInventory.find((item) => item._id.toString() === productId);
};