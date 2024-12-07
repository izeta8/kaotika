import handler from './confirmPurchase';
import { createDatabaseConnection, closeDatabaseConnection } from '@/database/connection';
import { processProductsPurchase } from './services/confirmPurchaseService';

jest.mock('./services/confirmPurchaseService', () => ({
  processProductsPurchase: jest.fn(), //mock function 
}));

jest.mock('@/database/connection', () => ({
  createDatabaseConnection: jest.fn(), 
  closeDatabaseConnection: jest.fn(),
}));

describe('POST /api/shop/confirmPurchseService', () => {
  // beforeEach(() => {
  //   createDatabaseConnection.mockResolvedValue({});
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //*********************************************TEST_1*****************************************//

  it('should return success and updated player when purchase is valid', async () => {

     //*****************************************************************//
    //*****************************INTERNAL FUNCTIONS*******************//
     //*****************************************************************//

     (processProductsPurchase as jest.Mock).mockResolvedValue({
      success: true,
      inventory: {
        helmets: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
        ],
      },
      gold: 650,
    });


    //*****************************************************************//
    //*********************************ARRANGE*****************************//
    //*****************************************************************//

    const req = {
      method: 'POST',
      body: {
        playerEmail: 'ander.zubizarreta@ikasle.aeg.eus',
        products: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
        ],
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    //*****************************************************************//
    //*********************************ACT*****************************//
     //*****************************************************************//

    await handler(req, res);

    //*****************************************************************//
    //*********************************ASSERT*****************************//
    //*****************************************************************//

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Purchase successful',
      inventory: {
        helmets: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
        ],
      },
      gold: 650,
    });
  });

  //*********************************************TEST_2*****************************************//

  it('should return failure and error message when purchase has insufficient funds', async () => {

      //*****************************************************************//
    //*****************************INTERNAL FUNCTIONS*******************//
     //*****************************************************************//

     (processProductsPurchase as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Insufficient funds',
    });

    //*****************************************************************//
    //*********************************ARRANGE*****************************//
    //*****************************************************************//

    const req = {
      method: 'POST',
      body: {
        playerEmail: 'ander.zubizarreta@ikasle.aeg.eus',
        products: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
        ],
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    //*****************************************************************//
    //*********************************ACT*****************************//
     //*****************************************************************//

    await handler(req, res);

    //*****************************************************************//
    //*********************************ASSERT*****************************//
    //*****************************************************************//

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Insufficient funds',
    });
  });
});


  