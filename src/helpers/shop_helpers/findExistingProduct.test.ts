import { findExistingProduct } from './findExistingProduct';

describe('findExistingProduct', () => {
  it('returns the product when found', () => {
    expect(findExistingProduct(['product1', 'product2'], 'product2')).toBe('product2');
  });

  it('returns null when not found', () => {
    expect(findExistingProduct(['product1', 'product2'], 'product3')).toBeNull();
  });

  it('returns null when inventory is empty', () => {
    expect(findExistingProduct([], 'product1')).toBeNull();
  });

  it('returns null when productId is empty', () => {
    expect(findExistingProduct(['product1'], '')).toBeNull();
  });
});
