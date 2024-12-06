import { processProductsPurchase } from '../shop/confirmPurchaseService';
import { fetchPlayer } from '../shop/playersService';
import Player from '../../../database/models/playerModel';

jest.mock('../shop/playersService', () => ({
  // Mock the fetchPlayer function . We don't mock player model here. We will do aside another unit test. Here we take granted taht fetch player works well
  fetchPlayer: jest.fn(),
}));

jest.mock('../../../database/models/playerModel', () => ({
  // Mock the Player model with findOneAndUpdate
  findOneAndUpdate: jest.fn(),
//   schema: {}, // Empty schema since it's not relevant for testing
}));

describe('processProductsPurchase', () => {
  const email = 'test@example.com';
  const products = [
    { _id: '123', name: "Helmet of Valor", value: 150, type: 'helmet' },
    { _id: '124', name: "Shield of Resilience", value: 200, type: 'shield' },
  ];

  const mockPlayer = {
    email,
    gold: 500,
    inventory: { helmets: [] },
  };

  const updatedPlayer = {
    ...mockPlayer,
    gold: 150,
    inventory: {
      helmets: [{ _id: '123', name: "Helmet of Valor", value: 150, type: 'helmet', quantity: 1 }],
      shields: [{ _id: '124', name: "Shield of Resilience", value: 200, type: 'shield', quantity: 1 }],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  it('should fetch the player using fetchPlayer', async () => {
    fetchPlayer.mockResolvedValue({ player: mockPlayer });

    const result = await fetchPlayer({}, email);

    expect(fetchPlayer).toHaveBeenCalledWith(expect.any(Object), email);
    expect(result).toEqual({ player: mockPlayer });
  });

  it('should calculate total cost of products correctly', () => {
    const totalCost = products.reduce((sum, product) => sum + product.value, 0);

    expect(totalCost).toBe(350); // 150 + 200
  });

  it('should validate that the player has sufficient funds', async () => {
    const totalCost = 350;
    fetchPlayer.mockResolvedValue({ player: mockPlayer });

    const player = (await fetchPlayer({}, email)).player;

    expect(player.gold).toBeGreaterThanOrEqual(totalCost); // 500 >= 350
  });

  it('should update the player inventory correctly', async () => {
    fetchPlayer.mockResolvedValue({ player: mockPlayer });

    const player = (await fetchPlayer({}, email)).player;

    products.forEach((product) => {
      const category = product.type + 's';
      if (!player.inventory[category]) player.inventory[category] = [];
      const existingProduct = player.inventory[category].find(
        (item) => item._id.toString() === product._id
      );

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        player.inventory[category].push({ ...product, quantity: 1 });
      }
    });

    expect(player.inventory).toEqual({
      helmets: [{ _id: '123', name: "Helmet of Valor", value: 150, type: 'helmet', quantity: 1 }],
      shields: [{ _id: '124', name: "Shield of Resilience", value: 200, type: 'shield', quantity: 1 }],
    });
  });

  it('should persist updated player data to the database', async () => {
    Player.findOneAndUpdate.mockResolvedValue(updatedPlayer);

    const result = await Player.findOneAndUpdate(
      { email },
      { $set: { gold: updatedPlayer.gold, inventory: updatedPlayer.inventory } },
      { new: true }
    );

    expect(Player.findOneAndUpdate).toHaveBeenCalledWith(
      { email },
      { $set: { gold: updatedPlayer.gold, inventory: updatedPlayer.inventory } },
      { new: true }
    );

    expect(result).toEqual(updatedPlayer);
  });
});

  