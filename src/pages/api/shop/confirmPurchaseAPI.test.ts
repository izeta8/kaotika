import { createMocks } from 'node-mocks-http';
import request from 'supertest';
import mongoose, { Connection, Model } from 'mongoose';
import handler from '@/pages/api/shop/confirmPurchase';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import Player from '@/database/models/playerModel';

describe('POST /api/shop/confirmPurchase', () => {
  jest.setTimeout(20000);
  // let server;
  let connection: mongoose.Connection | null = null;
  let TestPlayerModel: Model<typeof Player>;

  beforeAll(async () => {
    console.log('Starting beforeAll');
    connection = await createDatabaseConnection();

    if (connection) {
      // Use a dedicated test model or collection
      TestPlayerModel = connection.model<typeof Player>('Player', Player.schema);
    } else {
      throw new Error('Database connection is not established');
    }
    // // Initialize the server
    // server = request(handler);
  });

  afterAll(async () => {
    console.log('Starting afterAll');

    // Clean up all test players
    await TestPlayerModel.deleteMany({ isTest: true });

    if (connection) {
      await closeDatabaseConnection(connection);
      console.log('Database connection closed');
    } else {
      console.log('Connection was already null or not initialized.');
    }
    
  });

  it('should process a successful purchase', async () => {
    // Create a test player
      const testPlayer = await TestPlayerModel.create({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test Player', // Required field
        nickname: 'Testy', // Required field
        email: 'test@gmail.com', // Required field
        level: 1, // Required field, default set in schema
        experience: 0, // Required field, default set in schema
        gold: 1000, // Optional field, included in your example
        inventory: {
          helmets: [], // Optional field, included in your example
        },
        isTest: true, // Tagging as a test record
    });
    console.log('Created Test Player:', testPlayer);

    const foundTestPlayer = await TestPlayerModel.findOne({ email: 'test@gmail.com', isTest: true }).exec();

    console.log('Found Test Player:', foundTestPlayer);

    

    const playerEmail = 'test@gmail.com';
    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
    ];

    // const response = await server.post('/api/shop/confirmPurchase').send({ playerEmail, products });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        playerEmail: 'test@gmail.com',
        products: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
        ]
      },
    });

    await handler(req, res);

    console.log('Response Body:', res._getData());

    const responseBody = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe('Purchase successful');
    expect(responseBody.gold).toBe(650);
    expect(responseBody.inventory.helmets).toEqual([
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
    ]);

  });

  it('should fail if the player has insufficient gold', async () => {
    // Create a test player with low gold
    const testPlayer = await TestPlayerModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Player', // Required field
      nickname: 'Testy', // Required field
      email: 'test@gmail.com', // Required field
      level: 1, // Required field, default set in schema
      experience: 0, // Required field, default set in schema
      gold: 1000, // Optional field, included in your example
      inventory: {
        helmets: [], // Optional field, included in your example
      },
      isTest: true, // Tagging as a test record
    });

    const playerEmail = 'test@gmail.com';
    const products = [
      { _id: '125', name: 'Crown of Kings', value: 2000, type: 'helmet' },
    ];

    // const response = await server.post('/api/shop/confirmPurchase').send({ playerEmail, products });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        playerEmail: 'test@gmail.com',
        products: [
          { _id: '125', name: 'Crown of Kings', value: 2000, type: 'helmet' }
        ]
      },
    });

    await handler(req, res);

    const responseBody = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);
    expect(responseBody.success).toBe(false);
    expect(responseBody.message).toBe('Insufficient funds');
  });
});

