import { removeFromInventory } from './removeFromInventory';

describe('removeFromInventory', () => {
  let inventory: Record<string, string[]>;

  beforeEach(() => {
    // Setup the initial inventory with product IDs in each category
    inventory = {
      electronics: ['1', '2'], // '1' is Laptop, '2' is Headphones
      furniture: ['3'], // '3' is Chair
    };
  });

  it('should remove the product if it exists in the inventory', () => {
    const productId = '1';
    const result = removeFromInventory(inventory, 'electronics', productId);

    expect(result.success).toBe(true);
    expect(inventory.electronics).not.toContain(productId); // '1' should be removed
  });

  it('should return an error if the category does not exist', () => {
    const productId = '4'; // Non-existing product ID
    const result = removeFromInventory(inventory, 'toys', productId);

    expect(result.success).toBe(false);
    expect(result.message).toBe('The product category does not exist in the inventory.');
  });

  it('should return an error if the product is not found in the category', () => {
    const productId = '4'; // Non-existing product ID
    const result = removeFromInventory(inventory, 'electronics', productId);

    expect(result.success).toBe(false);
    expect(result.message).toBe('The product is not in stock.');
  });
});
