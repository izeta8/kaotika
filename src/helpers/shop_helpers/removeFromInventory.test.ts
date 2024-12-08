// removeFromInventory.test.ts
import { removeFromInventory } from './removeFromInventory';

describe('removeFromInventory', () => {
  let inventory;

  beforeEach(() => {
    inventory = {
      electronics: [
        { _id: '1', name: 'Laptop', quantity: 2 },
        { _id: '2', name: 'Headphones', quantity: 1 },
      ],
      furniture: [
        { _id: '3', name: 'Chair', quantity: 5 },
      ],
    };
  });

  it('should decrement the quantity by 1 if the quantity is more than 1', () => {
    const product = { _id: '1', name: 'Laptop' };
    const result = removeFromInventory(inventory, 'electronics', product);
    expect(result.success).toBe(true);
    expect(inventory.electronics[0].quantity).toBe(1); // Quantity should be reduced to 1
  });

//   it('should remove the product if the quantity is 1', () => {
//     const product = { _id: '2', name: 'Headphones' };
//     const result = removeFromInventory(inventory, 'electronics', product);
//     expect(result.success).toBe(true);
//     expect(inventory.electronics).not.toContainEqual(product); // Product should be removed
//   });

//   it('should return an error if the category does not exist', () => {
//     const product = { _id: '4', name: 'Keyboard' };
//     const result = removeFromInventory(inventory, 'toys', product);
//     expect(result.success).toBe(false);
//     expect(result.message).toBe('The product category does not exist in the inventory.');
//   });

//   it('should return an error if the product is not found in the category', () => {
//     const product = { _id: '4', name: 'Keyboard' };
//     const result = removeFromInventory(inventory, 'electronics', product);
//     expect(result.success).toBe(false);
//     expect(result.message).toBe('The product is not in stock.');
//   });
});
