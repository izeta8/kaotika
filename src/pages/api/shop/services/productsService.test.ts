import mongoose from 'mongoose';
import { fetchAllProducts } from './productsService';
import Ring from '../../../../database/models/ringModel';
import Armor from '../../../../database/models/armorModel';
import Artifact from '../../../../database/models/artifactModel';
import Boot from '../../../../database/models/bootModel';
import Helmet from '../../../../database/models/helmetModel';
import Ingredient from '../../../../database/models/ingredientModel';
import Shield from '../../../../database/models/shieldModel';
import Weapon from '../../../../database/models/weaponModel';

// Mock product data
const mockRings = [{ name: 'Gold Ring' }, { name: 'Silver Ring' }];
const mockArmors = [{ name: 'Iron Armor' }, { name: 'Steel Armor' }];
const mockArtifacts = [{ name: 'Ancient Artifact' }];
const mockBoots = [{ name: 'Leather Boots' }];
const mockHelmets = [{ name: 'Iron Helmet' }];
const mockIngredients = [{ name: 'Healing Herb' }];
const mockShields = [{ name: 'Wooden Shield' }];
const mockWeapons = [{ name: 'Iron Sword' }];

// Mock the `find` methods directly on the model prototypes
jest.mock('../../../../database/models/ringModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockRings),
  })),
}));

jest.mock('../../../../database/models/armorModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockArmors),
  })),
}));

jest.mock('../../../../database/models/artifactModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockArtifacts),
  })),
}));

jest.mock('../../../../database/models/bootModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockBoots),
  })),
}));

jest.mock('../../../../database/models/helmetModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockHelmets),
  })),
}));

jest.mock('../../../../database/models/ingredientModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockIngredients),
  })),
}));

jest.mock('../../../../database/models/shieldModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockShields),
  })),
}));

jest.mock('../../../../database/models/weaponModel', () => ({
  find: jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(mockWeapons),
  })),
}));

describe('Product Service', () => {
  let mockConnection: mongoose.Connection;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls

    // Mock the connection's model method
    mockConnection = {
      model: jest.fn((modelName: string) => {
        switch (modelName) {
          case 'Ring':
            return Ring;
          case 'Armor':
            return Armor;
          case 'Artifact':
            return Artifact;
          case 'Boot':
            return Boot;
          case 'Helmet':
            return Helmet;
          case 'Ingredient':
            return Ingredient;
          case 'Shield':
            return Shield;
          case 'Weapon':
            return Weapon;
          default:
            throw new Error(`Model ${modelName} not found`);
        }
      }),
    } as unknown as mongoose.Connection;
  });

  test('fetchAllProducts should return all products', async () => {
    // Act: Call fetchAllProducts with the mocked connection
    const products = await fetchAllProducts(mockConnection);

    // Assert: Check if all product models were called
    expect(Ring.find).toHaveBeenCalled();
    expect(Armor.find).toHaveBeenCalled();
    expect(Artifact.find).toHaveBeenCalled();
    expect(Boot.find).toHaveBeenCalled();
    expect(Helmet.find).toHaveBeenCalled();
    expect(Ingredient.find).toHaveBeenCalled();
    expect(Shield.find).toHaveBeenCalled();
    expect(Weapon.find).toHaveBeenCalled();

    // Assert: Check if the result matches the mock data
    expect(products).toEqual({
      rings: mockRings,
      armors: mockArmors,
      artifacts: mockArtifacts,
      boots: mockBoots,
      helmets: mockHelmets,
      ingredients: mockIngredients,
      shields: mockShields,
      weapons: mockWeapons,
    });
  });
});
