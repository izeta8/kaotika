import { addToInventory } from './addToInventory';
import { findExistingProduct } from './findExistingProduct';
import { incrementProductQuantity } from './incrementProductQuantity';

jest.mock('./findExistingProduct', () => ({
  findExistingProduct: jest.fn(),
}));

jest.mock('./incrementProductQuantity', () => ({
  incrementProductQuantity: jest.fn(),
}));

describe('addToInventory', () => {
  let playerInventory: Record<string, any[]>;

  beforeEach(() => {
    playerInventory = {
      weapons: [
        { _id: '1', type: 'weapon', name: 'Sword', qty: 1 },
        { _id: '2', type: 'weapon', name: 'Axe', qty: 1 },
      ],
    };
  });

  it('should add new products to the inventory', () => {
    const products = [
      { _id: '3', type: 'weapon', name: 'Bow' },
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.weapons).toHaveLength(3);
    expect(playerInventory.weapons).toContainEqual({ _id: '3', type: 'weapon', name: 'Bow', qty: 1 });
  });

//   it('should increment the quantity of an existing product', () => {
//     const products = [
//       { _id: '1', type: 'weapon', name: 'Sword' }, // This product already exists in inventory
//     ];

//     // Mock findExistingProduct to return a valid product
//     (findExistingProduct as jest.Mock).mockReturnValue(playerInventory.weapons[0]);

//     addToInventory(playerInventory, products);

//     expect(incrementProductQuantity).toHaveBeenCalledWith(playerInventory.weapons[0]);
//     expect(playerInventory.weapons[0].quantity).toBe(2); // Quantity should be incremented
//   });

//   it('should initialize a new category if it does not exist', () => {
//     const products = [
//       { _id: '4', type: 'armor', name: 'Shield' },
//     ];

//     addToInventory(playerInventory, products);

//     expect(playerInventory.armor).toBeDefined();
//     expect(playerInventory.armor).toHaveLength(1);
//     expect(playerInventory.armor[0]).toEqual({ _id: '4', type: 'armor', name: 'Shield', quantity: 1 });
//   });
});
