// import { processProductsPurchase } from '../shop/confirmPurchaseService';
// import { fetchPlayer } from '../shop/playersService';
// import Player from '../../../database/models/playerModel';

// jest.mock('../shop/playersService', () => ({ //mock the module with mock object
//   fetchPlayer: jest.fn(), //fetchPlayer is replaced with jest.fn(), a Jest mock function that will be arrange below
// }));

// jest.mock('../../../database/models/playerModel', () => {
//   return {
//     findOneAndUpdate: jest.fn(),
//     schema: {}, //make it empty cos not relevant in this test
//   };
// });

// describe('processProductsPurchase - Purchase with Email and Products', () => {
//   let mockConnection;

//   beforeEach(() => {
//     //.mockReturnValue(): Specifies what the model mock should return when it's called.
//     mockConnection = {
//       model: jest.fn().mockReturnValue({ //Creates a mock function that simulates the behavior of model.
//         findOneAndUpdate: Player.findOneAndUpdate, //Returns an object with a findOneAndUpdate property set to the real findOneAndUpdate method from Player.
//       }),
//     };

//     // Reset mocks before each test
//     // jest.clearAllMocks();
//   });

//   it('should reduce gold by product values and add products to inventory', async () => {

//     //*****************************************************************//
//     //*********************************ARRANGE*****************************//
//     //*****************************************************************//
    
//     const email = 'ander.zubizarreta@ikasle.aeg.eus';

//     // Mock the player's current data
//     const mockPlayer = {
//       email,
//       gold: 1000,
//       inventory: {
//         helmets: [],
//       },
//     };

//     // Mock the products to be purchased
//     const products = [
//       { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
//       { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
//     ];

//     // Mock fetchPlayer to return the player. Basically, mock fetchPlayer DB function giving the ({result}) done already and avoid DB calling. I put me myself the result in ({})
//     fetchPlayer.mockResolvedValue({ player: mockPlayer });

//     // Mock findOneAndUpdate to simulate updating the database
//     Player.findOneAndUpdate.mockResolvedValue({
//       ...mockPlayer,
//       gold: 650, // Gold after purchase
//       inventory: {
//         helmets: [
//           { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
//           { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
//         ],
//       },
//     });

//     //*****************************************************************//
//     //************************** ACT *******************************//
//     //*****************************************************************//

//     const result = await processProductsPurchase(mockConnection, email, products);

//     //*****************************************************************//
//     //************************** ASSERT *******************************//
//     //*****************************************************************//

//     // Verify the result
//     expect(result).toEqual({
//       success: true,
//       inventory: {
//         helmets: [
//           { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
//           { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
//         ],
//       },
//       gold: 650,
//     });

//     // Verify fetchPlayer was called correctly
//     expect(fetchPlayer).toHaveBeenCalledWith(mockConnection, email);

//     // Verify findOneAndUpdate was called to update the player's data
//     expect(Player.findOneAndUpdate).toHaveBeenCalledWith(
//       { email },
//       {
//         $set: {
//           gold: 650,
//           inventory: {
//             helmets: [
//               { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
//               { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
//             ],
//           },
//         },
//       },
//       { new: true }
//     );
//   });
// });







////////////////////////////////////////////////////////////////////////////////////////////

import mongoose from 'mongoose';
import { fetchPlayer, updatePlayer } from './playersService';
import { calculateTotalCost } from '@/helpers/shop_helpers/calculateTotalCost';
import { hasEnoughGold } from '@/helpers/shop_helpers/hasEnoughGold';
import { addToInventory } from '@/helpers/shop_helpers/addToInventory';
import { processProductsPurchase } from './confirmPurchaseService';
import { json } from 'stream/consumers';

// Mock the player service functions
jest.mock('../shop/playersService', () => ({
  fetchPlayer: jest.fn(),
  updatePlayer: jest.fn(),
}));

// Mock other helper functions
jest.mock('@/helpers/shop_helpers/calculateTotalCost', () => ({
  calculateTotalCost: jest.fn(),
}));

jest.mock('@/helpers/shop_helpers/hasEnoughGold', () => ({
  hasEnoughGold: jest.fn(),
}));

jest.mock('@/helpers/shop_helpers/addToInventory', () => ({
  addToInventory: jest.fn(),
}));

// Mock Mongoose model
const mockModel = {
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),  // Make sure this is defined
  save: jest.fn(),
};

const mockConnection = {
  model: jest.fn(() => mockModel),
};

// Mock mongoose.model to return the mock model
jest.spyOn(mongoose, 'model').mockImplementation(() => mockModel);

describe('processProductsPurchase', () => {
  let mockPlayer;

  beforeEach(() => {
    mockPlayer = {
      email: 'test@example.com',
      gold: 1000,
      inventory: {
        helmets: [],
      },
    };

    // Reset mocks before each test
    jest.clearAllMocks();

  //   // Mock the implementation of `fetchPlayer`
  //   fetchPlayer.mockResolvedValue({ player: mockPlayer });

  //   // Mock the implementation of `updatePlayer`
  //   updatePlayer.mockResolvedValue({
  //     updatedPlayer: {
  //       email: 'test@example.com',
  //       gold: 650,
  //       inventory: {
  //         helmets: [
  //           { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
  //           { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
  //         ],
  //       },
  //     },
  //   });

  //   // Mock other helper functions if needed
  //   calculateTotalCost.mockReturnValue(350);
  //   hasEnoughGold.mockReturnValue(true);
  //   addToInventory.mockImplementation((inventory, products) => {
  //     products.forEach((product) => {
  //       const category = product.type + 's';
  //       if (!inventory[category]) {
  //         inventory[category] = [];
  //       }
  //       inventory[category].push({ ...product, quantity: 1 });
  //     });
  //   });
  });

  it('should return updated player and success message if purchase is valid', async () => {
    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
    ];

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // Mock the implementation of `fetchPlayer`
    fetchPlayer.mockResolvedValue({ player: mockPlayer });

    // Mock the implementation of `updatePlayer`
    updatePlayer.mockResolvedValue({
      updatedPlayer: {
        email: 'test@example.com',
        gold: 650,
        inventory: {
          helmets: [
            { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
            { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
          ],
        },
      },
    });

    // Mock other helper functions if needed
    calculateTotalCost.mockReturnValue(350);
    hasEnoughGold.mockReturnValue(true);
    addToInventory.mockImplementation((inventory, products) => {
      products.forEach((product) => {
        const category = product.type + 's';
        if (!inventory[category]) {
          inventory[category] = [];
        }
        inventory[category].push({ ...product, quantity: 1 });
      });
    });
  // });



    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    // Mock the behavior of findOne to return the mock player
    // mockFindOne.mockResolvedValue(mockPlayer);

    // Call the function with a mock connection (null can be used for tests if connection isn't required)
    const result = await processProductsPurchase(mockConnection, 'test@example.com', products);

    // Verify the result
    expect(result.success).toBe(true);
    expect(result.gold).toBe(650);
    expect(result.inventory.helmets).toHaveLength(2);

  });

  it('should return failure if player has insufficient funds', async () => {
    fetchPlayer.mockResolvedValue({
      player: { ...mockPlayer, gold: 100 },
    });
    hasEnoughGold.mockReturnValue(false);

    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 100, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 20000, type: 'helmet' },
    ];

    // Call the function
    const result = await processProductsPurchase(mockConnection, 'test@example.com', products);

    console.log("el mensaje: " + result.gold);

    // Verify the result
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds');
  });
  
});


