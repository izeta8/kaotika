import { processProductsPurchase } from '../shop/confirmPurchaseService';
import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel';

jest.mock('../shop/playersService', () => ({ //mock the module with mock object
  fetchPlayer: jest.fn(), //fetchPlayer is replaced with jest.fn(), a Jest mock function that will be arrange below
}));

jest.mock('../../../database/models/playerModel', () => {
  return {
    findOneAndUpdate: jest.fn(),
    schema: {}, //make it empty cos not relevant in this test
  };
});

describe('processProductsPurchase - Purchase with Email and Products', () => {
  let mockConnection;

  beforeEach(() => {
    //.mockReturnValue(): Specifies what the model mock should return when it's called.
    mockConnection = {
      model: jest.fn().mockReturnValue({ //Creates a mock function that simulates the behavior of model.
        findOneAndUpdate: Player.findOneAndUpdate, //Returns an object with a findOneAndUpdate property set to the real findOneAndUpdate method from Player.
      }),
    };

    // Reset mocks before each test
    // jest.clearAllMocks();
  });

  it('should reduce gold by product values and add products to inventory', async () => {

    //*****************************************************************//
    //*********************************ARRANGE*****************************//
    //*****************************************************************//
    
    const email = 'ander.zubizarreta@ikasle.aeg.eus';

    // Mock the player's current data
    const mockPlayer = {
      email,
      gold: 1000,
      inventory: {
        helmets: [],
      },
    };

    // Mock the products to be purchased
    const products = [
      { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet' },
      { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet' },
    ];

    // Mock fetchPlayer to return the player. Basically, mock fetchPlayer DB function giving the ({result}) done already and avoid DB calling. I put me myself the result in ({})
    fetchPlayer.mockResolvedValue({ player: mockPlayer });

    // Mock findOneAndUpdate to simulate updating the database
    Player.findOneAndUpdate.mockResolvedValue({
      ...mockPlayer,
      gold: 650, // Gold after purchase
      inventory: {
        helmets: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
        ],
      },
    });

    //*****************************************************************//
    //************************** ACT *******************************//
    //*****************************************************************//

    const result = await processProductsPurchase(mockConnection, email, products);

    //*****************************************************************//
    //************************** ASSERT *******************************//
    //*****************************************************************//

    // Verify the result
    expect(result).toEqual({
      success: true,
      inventory: {
        helmets: [
          { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
          { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
        ],
      },
      gold: 650,
    });

    // Verify fetchPlayer was called correctly
    expect(fetchPlayer).toHaveBeenCalledWith(mockConnection, email);

    // Verify findOneAndUpdate was called to update the player's data
    expect(Player.findOneAndUpdate).toHaveBeenCalledWith(
      { email },
      {
        $set: {
          gold: 650,
          inventory: {
            helmets: [
              { _id: '123', name: "Guardian's Resolve", value: 150, type: 'helmet', quantity: 1 },
              { _id: '124', name: 'Helm of the Phoenix', value: 200, type: 'helmet', quantity: 1 },
            ],
          },
        },
      },
      { new: true }
    );
  });
});

