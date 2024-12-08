import express from 'express';
import request from 'supertest';
import mongoose, { Model } from 'mongoose';
import handler from '@/pages/api/shop/confirmPurchase';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import Player from '@/database/models/playerModel';

describe('POST /api/shop/confirmPurchase', () => {
  let connection = null;
  let TestPlayerModel: Model<typeof Player>;
  const app = express();
  const testRunId = "confirm_purchase";

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    if (connection) {
      TestPlayerModel = connection.model<typeof Player>('Player', Player.schema);
    }
    app.use(express.json());
    app.post('/api/shop/confirmPurchase', handler);
  });

  afterAll(async () => {
    await TestPlayerModel.deleteMany({ testRunId: testRunId });
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  });

  it('should process a successful purchase', async () => {
    const testPlayer = await TestPlayerModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Player',
      nickname: 'Testy',
      email: 'test@gmail.com',
      level: 1,
      experience: 0,
      gold: 1000,
      inventory: { helmets: [] },
      testRunId: testRunId
    });

    const response = await request(app)
      .post('/api/shop/confirmPurchase')
      .send({
        playerEmail: testPlayer.email,
        products: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
        ],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Purchase successful');
    expect(response.body.gold).toBe(650);
    expect(response.body.inventory.helmets).toEqual([
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
    ]);
  });

  it('should fail if the player has insufficient gold', async () => {
    const testPlayer = await TestPlayerModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Player',
      nickname: 'Testy',
      email: 'test@gmail.com',
      level: 1,
      experience: 0,
      gold: 100, // Not enough for the product
      inventory: { helmets: [] },
      testRunId: testRunId
    });

    const response = await request(app)
      .post('/api/shop/confirmPurchase')
      .send({
        playerEmail: testPlayer.email,
        products: [
          { _id: '125', name: 'Crown of Kings', value: 2000, type: 'helmet' },
        ],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Insufficient funds');
  });
});