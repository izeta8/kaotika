export const calculateTotalCost = (products: Array<Product>) => {
  return products.reduce((sum, product) => {
    if (!product.value || !product._id) {
      throw new Error('Each product must have a value and an _id');
    }

    // if (product.type === "ingredient") {
    //   const qty = product.quantity || 1; 
    //   return sum + product.value * qty;
    // } else {
      return sum + product.value;
    // }
  }, 0);
};
