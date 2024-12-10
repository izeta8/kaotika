import '@testing-library/jest-dom';
import ItemCard from '../components/shop/buy/ItemCard';
import React from "react";
import { render, screen, fireEvent,act } from "@testing-library/react";
import { ItemData } from '@/_common/interfaces/ItemData';

describe("ItemCard component", () => {
  
  const mockAddToCart = jest.fn();
  const mockSetProductConfirm = jest.fn();
  const mockSetItemModalShown = jest.fn();
  const mockSetModalItemData = jest.fn();
  const mockSetCartAnimating = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });
  

  const baseItem: ItemData = {
    _id: "item123",
    name: "Helmet",
    description: "Iron helmet",
    type: "weapon",
    value: 100,
    modifiers: {},
    min_lvl: 1,
    image: "/images/shop/test_item.png",
    base_percentage: 10,
    defense: 5,
    isUnique: false,
  };

  const defaultProps = {
    itemData: baseItem,
    addToCart: mockAddToCart,
    setProductConfirm: mockSetProductConfirm,
    setItemModalShown: mockSetItemModalShown,
    setModalItemData: mockSetModalItemData,
    isMagicalStuffShop: false,
    setCartAnimating: mockSetCartAnimating,
    isOnCart: false,
    hasEnoughMoney: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Does not render if there is no itemData", () => {
    const { container } = render(<ItemCard {...defaultProps} itemData={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });

  test("Does not render if value is 0", () => {
    const { container } = render(<ItemCard {...defaultProps} itemData={{ ...baseItem, value: 0 }} />);
    expect(container.firstChild).toBeNull();
  });

  test("Does not render if isUnique is true", () => {
    const { container } = render(<ItemCard {...defaultProps} itemData={{ ...baseItem, isUnique: true }} />);
    expect(container.firstChild).toBeNull();
  });

  test("Clicking on the card opens the modal with item data", () => {
    render(<ItemCard {...defaultProps} />);
    const card = screen.getByText("Helmet");
    fireEvent.click(card);
    expect(mockSetModalItemData).toHaveBeenCalledWith(baseItem);
    expect(mockSetItemModalShown).toHaveBeenCalledWith(true);
  });

  test("Clicking on BUY calls setProductConfirm with item", () => {
    render(<ItemCard {...defaultProps} />);
    const buyButton = screen.getByText("BUY");
    fireEvent.click(buyButton);
    expect(mockSetProductConfirm).toHaveBeenCalledWith(baseItem);
  });

  test("Clicking ADD TO CART starts the animation and then addToCart is called", async () => {
    render(<ItemCard {...defaultProps} isOnCart={false} />);
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });

    fireEvent.click(addToCartButton);
  
    await act(async () => {
      jest.runAllTimers();
    });
  
    expect(mockSetCartAnimating).toHaveBeenCalledTimes(2);
    expect(mockAddToCart).toHaveBeenCalled();
  });

  test("If hasEnoughMoney is false, the buttons are rendered disabled", () => {
    render(<ItemCard {...defaultProps} hasEnoughMoney={false} />);
    const buyButton = screen.getByRole('button', { name: /BUY/i }) as HTMLButtonElement;
    const addToCartButton = screen.getByRole('button', { name: /ADD TO CART/i }) as HTMLButtonElement;
    expect(buyButton.disabled).toBe(true);
    expect(addToCartButton.disabled).toBe(false);
  });

  test("If isOnCart is true and it is not a magic shop, the ‘ADD TO CART’ button displays ‘REMOVE CART’", () => {
    render(<ItemCard {...defaultProps} isOnCart={true} isMagicalStuffShop={false} />);
    expect(screen.getByText("REMOVE CART")).toBeInTheDocument();
  });

  test("If isOnCart is true and it is a magic shop, the button remains as ‘ADD TO CART’", () => {
    render(<ItemCard {...defaultProps} isOnCart={true} isMagicalStuffShop={true} />);
    expect(screen.getByText("ADD TO CART")).toBeInTheDocument();
  });

});



