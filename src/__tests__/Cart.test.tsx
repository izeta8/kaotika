import '@testing-library/jest-dom';
import Cart from '../components/shop/Cart';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Player } from "@/_common/interfaces/Player";
import { CartItem } from '@/_common/interfaces/CartItem';

describe("Cart Component", () => {
  let mockOnClose: jest.Mock;
  let mockSetItemsInCart: jest.Mock;
  let mockConfirmPurchase: jest.Mock;
  let playerData: Player;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockSetItemsInCart = jest.fn();
    mockConfirmPurchase = jest.fn();

    playerData = {
      gold: 1000,
    } as Player; 
  });

  const renderCart = (props?: Partial<React.ComponentProps<typeof Cart>>) => {
    const defaultProps = {
      isOpen: true,
      onClose: mockOnClose,
      cartItems: [
        {
          _id: "item1",
          name: "Sword",
          value: 100,
          type: "weapon",
          image: "/images/shop/items/sword.png",
          quantity: 1,
        },
        {
          _id: "item2",
          name: "Herb",
          value: 10,
          type: "ingredient",
          image: "/images/shop/items/herb.png",
          quantity: 3,
        },
      ] as CartItem[],
      setItemsInCart: mockSetItemsInCart,
      confirmPurchase: mockConfirmPurchase,
      playerData: playerData,
    };

    return render(<Cart {...defaultProps} {...props} />);
  };

  test("Does not render anything if isOpen is false", () => {
    renderCart({ isOpen: false });
    expect(screen.queryByText(/Your Cart/i)).not.toBeInTheDocument();
  });

  test("Displays the title and contents of the cart", () => {
    renderCart();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();

    expect(screen.getByText("Sword")).toBeInTheDocument();
    expect(screen.getByText("Herb")).toBeInTheDocument();

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("The total is calculated correctly", () => {
    renderCart();

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("130")).toBeInTheDocument();
  });

  test("Close the cart by clicking the close button.", () => {
    renderCart();
    const closeButton = screen.getByRole("button", { name: /CloseItem/ });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("Increasing and decreasing the number of ingredient items", () => {
    renderCart();

    const incrementButton = screen.getByRole("button", { name: /increase quantity/i });
    const decrementButton = screen.getByRole("button", { name: /decrease quantity/i });
  
    fireEvent.click(incrementButton);
    expect(mockSetItemsInCart).toHaveBeenCalledWith(expect.any(Function));
  
    fireEvent.click(decrementButton);
    expect(mockSetItemsInCart).toHaveBeenCalledWith(expect.any(Function));
  });

  test("Remove item from cart", () => {
    renderCart();
    const removeButtons = screen.getAllByRole("button", { name: "RemoveItem" });
    expect(removeButtons.length).toBe(2);

    // Removemos el primer ítem
    fireEvent.click(removeButtons[0]);
    expect(mockSetItemsInCart).toHaveBeenCalledWith(expect.any(Function));
  });

  test("Confirm purchase calls confirmPurchase and closes the cart.", () => {
    renderCart();
    const proceedButton = screen.getByText("Proceed to Checkout");
    fireEvent.click(proceedButton);

    // As the total (130) is less than playerData.gold (1000), clear the cart and close it.
    expect(mockConfirmPurchase).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockSetItemsInCart).toHaveBeenCalledWith([]);
  });

  test("If the total is greater than the available gold it does not clean the cart.", () => {
    const playerWithLessGold = { gold: 50 } as Player;
    renderCart({ playerData: playerWithLessGold });

    const proceedButton = screen.getByText("Proceed to Checkout");
    fireEvent.click(proceedButton);

    // Call confirmPurchase, but do not clear the cart as total > gold
    expect(mockConfirmPurchase).toHaveBeenCalled();
    expect(mockSetItemsInCart).not.toHaveBeenCalledWith([]); 
    expect(mockOnClose).toHaveBeenCalled();
  });

});



