import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { ItemData } from "@/_common/interfaces/ItemData";
import { MouseEventHandler } from "react";
import { Player } from "@/_common/interfaces/Player";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setItemsInCart: Function;
  confirmPurchase: Function;
  playerData: Player | null
}

interface CartItem extends ItemData {
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, setItemsInCart, confirmPurchase, playerData }) => {

  const increaseItem = (id: string) => {
    setItemsInCart((prevItems: CartItem[]) =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseItem = (id: string) => {
    setItemsInCart((prevItems: CartItem[]) =>
      prevItems.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItemsInCart((prevItems: CartItem[]) => prevItems.filter(item => item._id !== id));
  };

  const clearCart = () => setItemsInCart([]);

  const handlePurchase = () => {
    confirmPurchase(cartItems);
    if (playerData && total <= playerData.gold) {
      clearCart();
    }
    onClose();
  };

  if (!isOpen) return null;

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + (item.value || 0) * item.quantity, 0);

  const scrollBarStyle = "scrollbar scrollbar-thumb-medievalGold scrollbar-track-medievalGray";

  return (
    <div className="absolute right-4 top-20 w-[45rem] bg-gray-800 text-white z-50 border border-yellow-600 rounded-lg shadow-2xl animate-slideInFromRight">
      <div className={`bg-neutral-800 w-full max-h-[90vh] overflow-auto p-10 rounded-lg relative ${scrollBarStyle}`}>

        {/* Button close */}
        <CloseButton onClick={onClose} />

        <h2 className="text-5xl font-bold mb-8 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-3xl text-white">There are no items in your cart.</p>
        ) : (
          <div className={`max-h-[50vh] overflow-y-auto ${scrollBarStyle}`}>
            <div className="space-y-4">
              {cartItems.map(item => {

                const isItemIngredient = item.type === "ingredient";

                return (
                  <ItemRow
                    key={item._id}
                    item={item}
                    isItemIngredient={isItemIngredient}
                    decreaseItem={decreaseItem}
                    increaseItem={increaseItem}
                    removeItem={removeItem}
                  />
                );
              })}
            </div>
          </div>
        )}

        {(cartItems.length > 0) ?
          (total <= playerData?.gold!) ? /* Proceed to Checkout */ <ProceedCheckout handlePurchase={handlePurchase} /> :
            (/* Total */ <Total total={total} />)
          : <></>
        }
      </div>
    </div>
  );
};

// ---- ITEM ROW ---- //

interface ItemRowProps {
  item: CartItem,
  isItemIngredient: boolean,
  decreaseItem: Function,
  increaseItem: Function,
  removeItem: Function
}

const ItemRow: React.FC<ItemRowProps> = ({ item, isItemIngredient, decreaseItem, increaseItem, removeItem }) => {

  const { image, name, _id, value, quantity } = item;

  if (value === undefined || value === null) { return null; }

  return (
    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={`https://kaotika.vercel.app${image}`}
          alt={item.name}
          draggable={false}
          className="w-16 h-16 object-cover rounded"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
          }}
        />

        <span className="text-3xl">{name}</span>
      </div>
      <div className="flex items-center space-x-10">
        <div className="flex items-center gap-6">
          {isItemIngredient ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => decreaseItem(_id)}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <span className="text-2xl">{quantity}</span>
              <button
                onClick={() => increaseItem(_id)}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <span className="text-2xl"></span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{value * quantity}</span>
          <img
            src="/images/icons/gold.png"
            draggable={false}
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => removeItem(_id)}
            className="text-yellow-600 hover:text-yellow-700"
            aria-label={`RemoveItem`}
          >
            <FaTimes size={28} />
          </button>
        </div>
      </div>
    </div>
  )

}

// ---- CLOSE BUTTON ---- //

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {

  return (
    <button
      onClick={onClick}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-100"
      aria-label="CloseItem"
    >
      <FaTimes size={36} />
    </button>
  )

}

// ---- TOTAL ---- //

interface TotalProps {
  total: number
}

const Total: React.FC<TotalProps> = ({ total }) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center text-4xl font-semibold">
        <span>Total:</span>
        <div className="flex items-center gap-3">
          <span>{total}</span>
          <img
            src="/images/icons/gold.png"
            draggable={false}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ---- PROCEED TO CHECKOUT ---- //

interface ProceedCheckoutProps {
  handlePurchase: Function
}

const ProceedCheckout: React.FC<ProceedCheckoutProps> = ({ handlePurchase }) => {

  return (
    <div className="mt-12 flex justify-center relative">
      <button
        onClick={() => handlePurchase()}
        className="cursor-pointer transition transform hover:scale-105"
      >
        <span className="absolute top-5 left-1/2 transform -translate-x-1/2 text-4xl font-semibold text-white">
          Proceed to Checkout
        </span>
        <img
          src="/images/shop/buy/BUTTONBIMAGE1.png"
          alt="Proceed to Checkout"
          className="cursor-pointer"
          draggable={false}
        />
      </button>
    </div>
  )

}

export default Cart;


