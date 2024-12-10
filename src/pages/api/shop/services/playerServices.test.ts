// playersService.test.ts
import mongoose from 'mongoose';
import { fetchPlayer, updatePlayer } from './playersService';
import Player from '../../../../database/models/playerModel';

// Create a mock implementation of the Player model
const mockPlayers = [
  { email: 'test@example.com', name: 'Test Player' },
  { email: 'another@example.com', name: 'Another Player' },
];

// Mock the Player model
jest.mock('../../../../database/models/playerModel', () => {
  return {
    schema: {}, // Provide a fake schema for the mock
    findOne: jest.fn((query) => {
      return {
        exec: jest.fn().mockResolvedValue(mockPlayers.find(player => player.email === query.email)),
      };
    }),
    findOneAndUpdate: jest.fn((query, update) => {
      return {
        exec: jest.fn().mockResolvedValue({
          ...mockPlayers.find(player => player.email === query.email),
          ...update.$set,
        }),
      };
    }),
  };
});

describe('Player Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('fetchPlayer should return player data', async () => {
    // Act: Call fetchPlayer with a mocked connection
    const { player } = await fetchPlayer({ model: () => Player } as mongoose.Connection, 'test@example.com');

    // Assert: Check if findOne was called with the correct parameters
    expect(Player.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(player).toEqual(mockPlayers[0]);
  });

  test('updatePlayer should update player data', async () => {
    const updates = { name: 'Updated Player' };

    // Act: Call updatePlayer with a mocked connection
    const { updatedPlayer } = await updatePlayer({ model: () => Player } as mongoose.Connection, 'test@example.com', updates);

    // Assert: Check if findOneAndUpdate was called with the correct parameters
    expect(Player.findOneAndUpdate).toHaveBeenCalledWith(
      { email: 'test@example.com' },
      { $set: updates },
      { new: true }
    );
    expect(updatedPlayer).toEqual({ ...mockPlayers[0], ...updates });
  });
});