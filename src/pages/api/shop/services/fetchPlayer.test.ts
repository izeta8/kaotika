// playersService.test.ts
import mongoose from 'mongoose';
import { fetchPlayer, updatePlayer } from './playersService';
import Player from '../../../../database/models/playerModel';

// Mock the Player model
jest.mock('../../../../database/models/playerModel', () => ({
  schema: {}, // Provide a fake schema for the mock
}));

const mockPlayerData = {
  email: 'test@example.com',
  name: 'Test Player',
};

describe('Player Service', () => {
  let mockConnection: mongoose.Connection;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
    
    // Create a mock connection object with a model method
    mockConnection = {
      model: jest.fn().mockReturnValue({
        findOne: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockPlayerData), // Mock resolved value for fetch
        }),
        findOneAndUpdate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue({ ...mockPlayerData, name: 'Updated Player' }), // Mock resolved value for update
        }),
      }),
    } as unknown as mongoose.Connection; // Cast to mongoose.Connection
  });

  test('fetchPlayer should return player data', async () => {
    // Act: Call fetchPlayer with the mocked connection
    const { player } = await fetchPlayer(mockConnection, 'test@example.com');

    // Assert: Check if model was called with the correct parameters
    expect(mockConnection.model).toHaveBeenCalledWith('Player', Player.schema);
    expect(player).toEqual(mockPlayerData);
  });

  test('updatePlayer should update player data', async () => {
    const updates = { name: 'Updated Player' };

    // Act: Call updatePlayer with the mocked connection
    const { updatedPlayer } = await updatePlayer(mockConnection, 'test@example.com', updates);

    // Assert: Check if model was called with the correct parameters
    expect(mockConnection.model).toHaveBeenCalledWith('Player', Player.schema);
    expect(updatedPlayer).toEqual({ ...mockPlayerData, ...updates });
  });
});