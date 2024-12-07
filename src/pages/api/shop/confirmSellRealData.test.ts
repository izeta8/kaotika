import express from 'express';
import request from 'supertest';
import mongoose, { Model } from 'mongoose';
import handler from '@/pages/api/shop/confirmSell'; // Ensure this points to your handler
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import Player from '@/database/models/playerModel';

describe('POST /api/shop/confirmSell', () => {
  let connection = null;
  let TestPlayerModel: Model<typeof Player>;
  const app = express();
  const testRunId = "confirm_sell";

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    if (connection) {
      TestPlayerModel = connection.model<typeof Player>('Player', Player.schema);
    }
    app.use(express.json());
    app.post('/api/shop/confirmSell', handler); // Update the path to match your endpoint
  });

  afterAll(async () => {
    await TestPlayerModel.deleteMany({ testRunId: testRunId });
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  });

  it('should process a successful sell', async () => {
    const testPlayer = await TestPlayerModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Player',
      nickname: 'Testy',
      email: 'testSell@gmail.com',
      level: 1,
      experience: 0,
      gold: 100,
      inventory: { helmets: [{ _id: '123', name: 'Basic Helmet', value: 50, type: 'helmet', quantity: 2 }] },
      testRunId: testRunId
    });

    const response = await request(app)
      .post('/api/shop/confirmSell')
      .send({
        playerEmail: testPlayer.email,
        product: { _id: '123', name: 'Basic Helmet', value: 50, type: 'helmet' },
        productPrice: 50,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Sell successful');
    expect(response.body.gold).toBe(150);
    expect(response.body.inventory.helmets).toEqual([
      { _id: '123', name: 'Basic Helmet', value: 50, type: 'helmet', quantity: 1 },
    ]);
  });

//   it('should fail if the product is not in stock', async () => {
//     const testPlayer = await TestPlayerModel.create({
//       _id: new mongoose.Types.ObjectId(),
//       name: 'Test Player',
//       nickname: 'Testy',
//       email: 'testSell@gmail.com',
//       level: 1,
//       experience: 0,
//       gold: 100,
//       inventory: { helmets: [] }, // Empty inventory
//       testRunId: testRunId
//     });

//     const response = await request(app)
//       .post('/api/shop/confirmSell')
//       .send({
//         playerEmail: testPlayer.email,
//         product: { _id: '123', name: 'Basic Helmet', value: 50, type: 'helmet' },
//         productPrice: 50,
//       });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('The product is not in stock.');
//   });

//   it('should fail if the product category does not exist', async () => {
//     const testPlayer = await TestPlayerModel.create({
//       _id: new mongoose.Types.ObjectId(),
//       name: 'Test Player',
//       nickname: 'Testy',
//       email: 'testSellt@gmail.com',
//       level: 1,
//       experience: 0,
//       gold: 100,
//       inventory: { armors: [] }, // No 'helmets' category
//       testRunId: testRunId
//     });

//     const response = await request(app)
//       .post('/api/shop/confirmSell')
//       .send({
//         playerEmail: testPlayer.email,
//         product: { _id: '123', name: 'Basic Helmet', value: 50, type: 'helmet' },
//         productPrice: 50,
//       });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('The product category does not exist in the inventory.');
//   });
});
