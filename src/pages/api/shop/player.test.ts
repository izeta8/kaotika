import handler from '@/pages/api/shop/player'; // Import the API route handler
import { fetchPlayer } from '../../../pages/api/shop/services/playersService'; // Import the service function
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';

// Mock dependencies
jest.mock('../../../pages/api/shop/services/playersService', () => ({
  fetchPlayer: jest.fn(),
}));

jest.mock('@/database/connection', () => ({
  createDatabaseConnection: jest.fn(),
  closeDatabaseConnection: jest.fn(),
}));

describe('Player API', () => {
  it('should return 200 with player data when player exists', async () => {
    // Arrange: Prepare mock data
    const playerEmail = 'test@example.com';
    const mockedPlayer = { player: { email: playerEmail, name: 'Test Player' } };

    // Mock fetchPlayer to return the mocked player data
    (fetchPlayer as jest.Mock).mockResolvedValue(mockedPlayer);
    (createDatabaseConnection as jest.Mock).mockResolvedValue({}); // Mock successful DB connection

    // Simulate a mock request and response
    const req = {
      method: 'GET',
      query: { playerEmail },
    };

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
    expect(responseData.player.email).toBe(playerEmail);  // Checking the email property directly
    expect(fetchPlayer).toHaveBeenCalledWith(expect.anything(), playerEmail);
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });

  it('should return 404 if player is not found', async () => {
    // Arrange: Prepare mock data
    const playerEmail = 'nonexistent@example.com';
    (fetchPlayer as jest.Mock).mockResolvedValue({ player: null });
    (createDatabaseConnection as jest.Mock).mockResolvedValue({});

    // Simulate a mock request and response
    const req = {
      method: 'GET',
      query: { playerEmail },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      _getData: () => res.json.mock.calls[0][0],
      _getStatusCode: () => res.status.mock.calls[0][0],
    };

    // Act: Call the handler function
    await handler(req, res);

    // Assert: Check that the status is 404 for player not found
    const responseData = res._getData();
  
  // Status should be 404 and message should contain 'Player with email'
  expect(res._getStatusCode()).toBe(404);
  expect(responseData.message).toContain('Player with email');  // Check the message in response data
  
  // Ensure other functions were called
  expect(fetchPlayer).toHaveBeenCalledWith(expect.anything(), playerEmail);
  expect(createDatabaseConnection).toHaveBeenCalled();
  expect(closeDatabaseConnection).toHaveBeenCalled();
  });

//   it('should return 400 if playerEmail is missing or invalid', async () => {
//     // Arrange: Simulate a request with no playerEmail
//     const req = {
//       method: 'GET',
//       query: {}, // Missing playerEmail
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//       _getData: () => res.json.mock.calls[0][0],
//       _getStatusCode: () => res.status.mock.calls[0][0],
//     };

//     // Act: Call the handler function
//     await handler(req, res);

//     // Assert: Check that the status is 400 for invalid query parameter
//     const responseData = res._getData();
  
//   // Status should be 400 and message should contain 'Missing or invalid playerEmail'
//   expect(res._getStatusCode()).toBe(400);
//   expect(responseData.message).toContain('Missing or invalid playerEmail in query parameters');  // Check the error message
  
//   // Ensure the database connection functions were NOT called
//   expect(createDatabaseConnection).not.toHaveBeenCalled();
//   expect(closeDatabaseConnection).not.toHaveBeenCalled();
//   });

//   it('should return 500 if there is a server error', async () => {
//     // Arrange: Simulate an error from fetchPlayer (e.g., database issue)
//     const playerEmail = 'test@example.com';
//     const errorMessage = 'Database connection failed';

//     (fetchPlayer as jest.Mock).mockRejectedValue(new Error(errorMessage));
//     (createDatabaseConnection as jest.Mock).mockResolvedValue({});

//     // Simulate a mock request and response
//     const req = {
//       method: 'GET',
//       query: { playerEmail },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//       _getData: () => res.json.mock.calls[0][0],
//       _getStatusCode: () => res.status.mock.calls[0][0],
//     };

//     // Act: Call the handler function
//     await handler(req, res);

//     // Assert: Check that the status is 500 for server error
//     const responseData = res._getData();
  
//     // Status should be 500 and the message should contain 'Error fetching player'
//     expect(res._getStatusCode()).toBe(500);
//     expect(responseData.message).toContain('Error fetching player');
//     expect(responseData.message).toContain(errorMessage);  // Ensure the error message is included
  
//     // Ensure other functions were called (DB connection open and close)
//     expect(createDatabaseConnection).toHaveBeenCalled();
//     expect(closeDatabaseConnection).toHaveBeenCalled();
//   });
});

  
