import { hasEnoughGold } from './hasEnoughGold';

describe('hasEnoughGold', () => {
  it('should return true if playerGold is equal to totalCost', () => {
    const playerGold = 100;
    const totalCost = 100;
    expect(hasEnoughGold(playerGold, totalCost)).toBe(true);
  });

  it('should return true if playerGold is greater than totalCost', () => {
    const playerGold = 150;
    const totalCost = 100;
    expect(hasEnoughGold(playerGold, totalCost)).toBe(true);
  });

  it('should return false if playerGold is less than totalCost', () => {
    const playerGold = 50;
    const totalCost = 100;
    expect(hasEnoughGold(playerGold, totalCost)).toBe(false);
  });

  it('should return true if playerGold is 0 and totalCost is also 0', () => {
    const playerGold = 0;
    const totalCost = 0;
    expect(hasEnoughGold(playerGold, totalCost)).toBe(true);
  });
  
});