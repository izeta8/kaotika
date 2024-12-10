export const calculateTotalCost = (products: Array<{ value: number, _id: string }>) => {
  return products.reduce((sum, product) => {
    if (!product.value || !product._id) {
      throw new Error('Each product must have a value and an _id');
    }
    if (product.type === "ingredient") {
      return sum + product.value * product.quantity;
    } else {
      return sum + product.value;
    }

  }, 0);
};