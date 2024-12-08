import express from 'express';
import request from 'supertest';
import mongoose, { Connection } from 'mongoose';
import handler from '@/pages/api/shop/products'; // Ensure this path matches your project structure
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';

jest.setTimeout(30000);

describe('GET /api/shop/products', () => {
  let connection: Connection | null = null;
  let productModel;
  const app = express();

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    app.use(express.json());
    app.get('/api/shop/products', handler);

    if (connection) {
      // Register the Product model to the connection
    //   productModel = connection.model('Product', Product.schema);
    }
  });

  afterAll(async () => {
    // Clean up by closing the connection
    if (connection) {
      await closeDatabaseConnection(connection);
    }
  });

  it('should return a product with status 200 if returns products', async () => {

    const response = await request(app).get('/api/shop/products');

    // console.log('Response Body:', response.body); // Debug output to verify the response body

    expect(response.statusCode).toBe(200);
    expect(response.body.rings.length).toBeGreaterThan(0);
    
  });
});
