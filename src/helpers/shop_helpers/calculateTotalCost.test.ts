import { calculateTotalCost } from './calculateTotalCost';
import { mockProducts, mockEmptyProducts, mockInvalidProducts } from './mockProducts';

describe('calculateTotalCost', () => {
  it('should calculate the total cost correctly when products are valid', () => {
    const result = calculateTotalCost(mockProducts);
    const expectedTotal = 10 + 20 + 30; // 60
    expect(result).toBe(expectedTotal);
  });
});
