import handler from '@/pages/api/shop/products'; // Import the API route handler
import { fetchAllProducts } from './services/productsService'; // Import the service function
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
    const req = {
      method: 'GET',
    } as unknown as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      _getData: () => res.json.mock.calls[0][0], // Access the response data
      _getStatusCode: () => res.status.mock.calls[0][0], // Access the response status code
    };

    // Act: Call the handler function
    await handler(req, res);

    // Assert: Check that the correct status and data are returned
    const responseData = res._getData();
    expect(res._getStatusCode()).toBe(200);
    expect(responseData).toEqual(mockedProducts); // Check the data directly
    expect(fetchAllProducts).toHaveBeenCalledWith(expect.anything());
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });

  it('should return 500 if an error occurs while fetching products', async () => {
    // Arrange: Prepare mock behavior for an error
    (fetchAllProducts as jest.Mock).mockRejectedValue(new Error('Database error'));
    (createDatabaseConnection as jest.Mock).mockResolvedValue({}); // Mock successful DB connection

    // Simulate a mock request and response
    const req = {
      method: 'GET',
    } as unknown as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      _getData: () => res.json.mock.calls[0][0],
      _getStatusCode: () => res.status.mock.calls[0][0],
    };

    // Act: Call the handler function
    await handler(req, res);

    // Assert: Check that the correct status and error message are returned
    const responseData = res._getData();
    expect(res._getStatusCode()).toBe(500);
    expect(responseData.message).toBe('Error fetching products');
    expect(responseData.error).toBe('Database error'); // Ensure the error message is passed
    expect(fetchAllProducts).toHaveBeenCalledWith(expect.anything());
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });

//   it('should return 500 if database connection fails', async () => {
//     // Arrange: Simulate database connection failure
//     (createDatabaseConnection as jest.Mock).mockResolvedValue(null);

//     // Simulate a mock request and response
//     const req = {
//       method: 'GET',
//     } as unknown as NextApiRequest;

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//       _getData: () => res.json.mock.calls[0][0],
//       _getStatusCode: () => res.status.mock.calls[0][0],
//     };

//     // Act: Call the handler function
//     await handler(req, res);

//     // Assert: Check that the correct status and error message are returned
//     const responseData = res._getData();
//     expect(res._getStatusCode()).toBe(500);
//     expect(responseData.message).toBe('Error fetching products');
//     expect(responseData.error).toBe('Database connection failed'); // Ensure the error is descriptive
//     expect(fetchAllProducts).not.toHaveBeenCalled(); // fetchAllProducts should not be called
//     expect(createDatabaseConnection).toHaveBeenCalled();
//     expect(closeDatabaseConnection).not.toHaveBeenCalled(); // closeDatabaseConnection should not be called since connection was null
//   });
});
