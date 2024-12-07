import { processProductsPurchase } from './confirmPurchaseService';
import mongoose from 'mongoose';

describe('processProductsPurchase', () => {
  let mockConnection;
  let mockModel;

  beforeEach(() => {
    // Mock Mongoose model methods
    mockModel = {
      findOne: jest.fn(() => ({
        exec: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          gold: 1000,
          inventory: { helmets: [] },
        }), // Mock the result of findOne
      })),
      findOneAndUpdate: jest.fn(() => ({
        exec: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          gold: 650,
          inventory: {
            helmets: [
              { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
              { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
            ],
          },
        }), // Mock the result of findOneAndUpdate
      })),
    };

    // Mock Mongoose connection object
    mockConnection = {
      model: jest.fn(() => mockModel), // Mock the `model` method to return the mocked model
    };

    // Mock `mongoose.model` as a backup (if used globally)
    jest.spyOn(mongoose, 'model').mockImplementation(() => mockModel);

    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return updated player and success message if purchase is valid', async () => {
    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
    ];

    const result = await processProductsPurchase(mockConnection, 'test@example.com', products);

    expect(result.success).toBe(true);
    expect(result.gold).toBe(650); // Ensure gold is reduced
    expect(result.inventory.helmets).toHaveLength(products.length); // Ensure inventory is updated
  });

  it('should return failure if player has insufficient funds', async () => {
    // Adjust `findOne` mock to simulate insufficient funds
    mockModel.findOne.mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        gold: 100, // Not enough funds
        inventory: { helmets: [] },
      }),
    }));

    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
    ];

    const result = await processProductsPurchase(mockConnection, 'test@example.com', products);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds');
    expect(mockModel.findOneAndUpdate).not.toHaveBeenCalled(); // No update should occur
  });
});

