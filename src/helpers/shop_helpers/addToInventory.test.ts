import { addToInventory } from './addToInventory';
import { ItemData } from '@/_common/interfaces/ItemData';

describe('addToInventory', () => {
  let playerInventory: Record<string, string[]>;

  beforeEach(() => {
    // Setup an empty inventory for each test
    playerInventory = {};
  });

  it('should add a single product to the inventory', () => {
    const products: ItemData[] = [
      {
        _id: '1', type: 'ingredient', qty: 1,
        name: '',
        description: '',
        image: ''
      },
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.ingredients).toContain('1'); // '1' should be added to 'ingredients'
    expect(playerInventory.ingredients.length).toBe(1); // There should be one item in the 'ingredients' category
  });

  it('should add multiple products to the inventory under the same category', () => {
    const products: ItemData[] = [
      {
        _id: '1', type: 'ingredient', qty: 3,
        name: '',
        description: '',
        image: ''
      },
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.ingredients).toContain('1'); // '1' should be added three times
    expect(playerInventory.ingredients.length).toBe(3); // There should be three items in 'ingredients'
  });

  it('should initialize the category if it does not exist', () => {
    const products: ItemData[] = [
      {
        _id: '1', type: 'tool', qty: 2,
        name: '',
        description: '',
        image: ''
      },
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.tools).toEqual(['1', '1']); // '1' should be added twice to 'tools'
    expect(playerInventory.tools.length).toBe(2); // Length should be 2
  });

  it('should handle missing product quantity and default to 1', () => {
    const products: ItemData[] = [
      {
        _id: '2', type: 'ingredient',
        name: '',
        description: '',
        image: ''
      }, // No qty provided, so default to 1
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.ingredients).toContain('2'); // '2' should be added once
    expect(playerInventory.ingredients.length).toBe(1); // There should be one item in 'ingredients'
  });

  it('should add multiple products to different categories correctly', () => {
    const products: ItemData[] = [
      {
        _id: '1', type: 'ingredient', qty: 1,
        name: '',
        description: '',
        image: ''
      },
      {
        _id: '2', type: 'tool', qty: 2,
        name: '',
        description: '',
        image: ''
      },
    ];

    addToInventory(playerInventory, products);

    expect(playerInventory.ingredients).toContain('1'); // '1' should be in 'ingredients'
    expect(playerInventory.tools).toEqual(['2', '2']); // '2' should be added twice to 'tools'
  });
});