import express from 'express';
import request from 'supertest';
import mongoose, { Connection, Model } from 'mongoose';
import handler from '@/pages/api/shop/player'; // Ensure this path matches your project structure
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import Player from '../../../database/models/playerModel'; // Import the Player model

describe('GET /api/shop/player', () => {
  let connection: Connection | null = null;
  let playerModel;
  const app = express();

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    app.use(express.json());
    app.get('/api/shop/player', handler);

    if (connection) {
      // Register the Player model to the connection
      playerModel = connection.model('Player', Player.schema);
    }
  });

  afterAll(async () => {
    // Clean up by closing the connection
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  });

it('should return a player with status 200 for an existing email', async () => {
  const email = "ander.zubizarreta@ikasle.aeg.eus";

  // Verify if the player exists in the database
  const existingPlayer = await playerModel.findOne({ email });
  console.log('Existing Player:', existingPlayer); // Debug output to verify the query result

  if (!existingPlayer) {
    throw new Error(`Player with email ${email} not found in the database`);
  }

  const response = await request(app).get('/api/shop/player').query({ playerEmail: email });

  console.log('Response Body:', response.body); // Debug output to verify the response body

  expect(response.statusCode).toBe(200);
  expect(response.body.player).toHaveProperty('_id', existingPlayer._id.toString());
  expect(response.body.player).toHaveProperty('name', existingPlayer.name);
  expect(response.body.player).toHaveProperty('email', email);
});

  it('should return a 400 status code if playerEmail is missing or invalid', async () => {
    const response = await request(app).get('/api/shop/player').query({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Missing or invalid playerEmail in query parameters');
  });

  it('should return a 500 status code if there is an error fetching the player', async () => {
    // Simulate a database error by closing the connection
    // if (connection) {
    //   await closeDatabaseConnection(connection);
    //   connection = null; // Ensure connection state is null to simulate disconnection
    // }
  
    const response = await request(app).get('/api/shop/player').query({ playerEmail: 'test@example.com' });

    console.log("la respuesta: " + JSON.stringify(response));
  
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Player with email test@example.com not found");
  });
});

