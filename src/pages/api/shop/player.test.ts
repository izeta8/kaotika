import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'; // Assuming mongoose is used for DB connection
import { closeDatabaseConnection, createDatabaseConnection } from '@/database/connection';
import { populatePlayer } from './services/playersService';
import handler from './player';

jest.mock('@/database/connection', () => ({
  createDatabaseConnection: jest.fn(),
  closeDatabaseConnection: jest.fn(),
}));

jest.mock('./services/playersService', () => ({
  populatePlayer: jest.fn(),
}));

describe('Player API', () => {
  let mockConnection: mongoose.Connection;
  let mockPopulatePlayer: jest.Mock;

  beforeEach(() => {
    mockConnection = {} as mongoose.Connection;
    mockPopulatePlayer = jest.fn();
    (jest.mocked(createDatabaseConnection) as jest.Mock).mockResolvedValue(mockConnection);
    (jest.mocked(populatePlayer) as jest.Mock).mockResolvedValue('Mocked Player Data');
  });

  it('should return 200 with player data when player exists', async () => {
    const req = { query: { playerEmail: 'test@example.com' } } as unknown as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Mocked Player Data');
    expect(createDatabaseConnection).toHaveBeenCalled();
    expect(populatePlayer).toHaveBeenCalledWith(mockConnection, 'test@example.com');
    expect(closeDatabaseConnection).toHaveBeenCalled();
  });

  it('should return 400 for missing or invalid playerEmail', async () => {
    const req = { query: {} } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing or invalid playerEmail in query parameters' });
  });

  it('should return 500 on database connection error', async () => {
    (jest.mocked(createDatabaseConnection) as jest.Mock).mockRejectedValue(new Error('Connection failed'));
    const req = { query: { playerEmail: 'test@example.com' } } as unknown as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
  