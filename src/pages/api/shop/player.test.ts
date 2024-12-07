import express from 'express';
import request from 'supertest';
import mongoose, { Connection, Model } from 'mongoose';
import handler from '@/pages/api/shop/player'; // Ensure this path matches your project structure
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import Player from '../../../database/models/playerModel'; // Import the Player model

describe('GET /api/players', () => {
  let connection: Connection | null = null;
  const app = express();

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    app.use(express.json());
    app.get('/api/shop/player', handler);

    if (connection) {
      // Register the Player model to the connection
      connection.model('Player', Player.schema);
    }
  });

  afterAll(async () => {
    // Clean up any test data and close the connection
    if (connection) {
      await Player.deleteMany({ email: 'testUno@gmail.com' }); // Delete test players if needed
      await closeDatabaseConnection(connection);
    }
  });

  it('should return a player with status 200 for a valid email', async () => {
    // Create a test player in the database
    const testPlayer = await Player.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Player',
      email: 'testUno@gmail.com',
      nickname: 'testss',
      level: 1,
      experience: 0,
      gold: 100,
      inventory: {},
    });

    const response = await request(app).get('/api/shop/player').query({ playerEmail: 'test@example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', testPlayer._id.toString());
    expect(response.body).toHaveProperty('name', 'Test Player');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should return a 400 status code if playerEmail is missing or invalid', async () => {
    const response = await request(app).get('/api/shop/player').query({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Missing or invalid playerEmail in query parameters');
  });

  it('should return a 500 status code if there is an error fetching the player', async () => {
    // Close the connection to simulate a database error
    if (connection) {
      await closeDatabaseConnection(connection);
      connection = null;
    }

    const response = await request(app).get('/api/shop/player').query({ playerEmail: 'test@example.com' });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Error fetching player');
  });
});
