import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/shop/products'; // Import your API route handler
import { fetchAllProducts } from './services/productsService'; // Import your service
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';

// Mock dependencies
jest.mock('./services/productsService', () => ({
  fetchAllProducts: jest.fn(),
}));

jest.mock('@/database/connection', () => ({
  createDatabaseConnection: jest.fn(),
  closeDatabaseConnection: jest.fn(),
}));

describe('Products API', () => {
  it('should return 200 with all products data when successful', async () => {
    // Arrange: Prepare mock data
    const mockedProducts = {
      rings: [{ name: 'Gold Ring' }, { name: 'Silver Ring' }],
      armors: [{ name: 'Iron Armor' }, { name: 'Steel Armor' }],
    };

    // Mock fetchAllProducts to return the mocked products data
    (fetchAllProducts as jest.Mock).mockResolvedValue(mockedProducts);
    (createDatabaseConnection as jest.Mock).mockResolvedValue({}); // Mock successful DB connection

    // Simulate a mock request and response
    const req = { method: 'GET' } as NextApiRequest;
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    } as unknown as NextApiResponse;

    // Act: Call the handler function
    await handler(req, res);

    // Assert: Check that the correct status and data are returned
    expect(res.status).toHaveBeenCalledWith(200); // Ensure status is 200
    expect(res.json).toHaveBeenCalledWith(mockedProducts); // Ensure the mocked products data is passed to json
    expect(fetchAllProducts).toHaveBeenCalledWith(expect.anything());
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });

  it('should return 500 if an error occurs while fetching products', async () => {
    // Arrange: Prepare mock behavior for an error
    (fetchAllProducts as jest.Mock).mockRejectedValue(new Error('Database error'));
    (createDatabaseConnection as jest.Mock).mockResolvedValue({}); // Mock successful DB connection

    // Simulate a mock request and response
    const req = { method: 'GET' } as NextApiRequest;
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    } as unknown as NextApiResponse;

    // Act: Call the handler function
    await handler(req, res);

    // Assert: Check that the correct status and error message are returned
    expect(res.status).toHaveBeenCalledWith(500); // Ensure status is 500
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error fetching products',
      error: 'Database error',
    }); // Ensure the error message is passed to json
    expect(fetchAllProducts).toHaveBeenCalledWith(expect.anything());
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });
});
