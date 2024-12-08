import { incrementProductQuantity } from './incrementProductQuantity';

describe('incrementProductQuantity', () => {
  it('should increment the quantity by 1 when quantity is a positive number', () => {
    const product = { _id: '1', name: 'Product A', quantity: 5 };
    incrementProductQuantity(product);
    expect(product.quantity).toBe(6);
  });

  it('should set quantity to 1 and increment it to 2 if quantity is undefined', () => {
    const product = { _id: '2', name: 'Product B' }; // No quantity defined
    incrementProductQuantity(product);
    expect(product.quantity).toBe(2);
  });
});