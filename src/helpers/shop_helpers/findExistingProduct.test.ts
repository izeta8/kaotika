import { findExistingProduct } from './findExistingProduct';
import { mockProducts } from './mockProducts';

describe('findExistingProduct', () => {
  it('should find and return an existing product if the product ID matches', () => {
    const productId = 'product2';
    const result = findExistingProduct(mockProducts, productId);
    expect(result).toEqual({ _id: 'product2' });
  });
});