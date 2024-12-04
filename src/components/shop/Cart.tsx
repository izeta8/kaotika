import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ItemData } from "@/_common/interfaces/ItemData";
import Layout from "@/components/Layout";
import { log } from "node:console";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  clearCart: () => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
}

interface CartItem extends ItemData {
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, clearCart, increaseItem, decreaseItem, removeItem }) => {
 
  const handlePurchase = () => {
    clearCart();
    onClose();
  };


  if (!isOpen) return null;

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + (item.value || 0) * item.quantity, 0);


  return (
    <div className="absolute right-4 top-20 w-[45rem] bg-gray-800 text-white z-50 border border-yellow-600 rounded-lg shadow-2xl animate-slideInFromRight">
    <div className="bg-neutral-800 w-full max-h-[90vh] overflow-auto p-10 rounded-lg relative">
      {/* Button close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-100"
      >
        <FaTimes size={36} />
      </button>

      <h2 className="text-5xl font-bold mb-8 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-3xl text-white">There are no items in your cart.</p>
      ) : (
        <div className="max-h-[50vh] overflow-y-auto scrollbar scrollbar-thumb-medievalGold scrollbar-track-medievalGray">
          <div className="space-y-4">
            {cartItems.map(item => {
              const isItemIngredient = item.type === "ingredient";

              return (
                <div key={item._id} className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://kaotika.vercel.app${item.image}`}
                      alt={item.name}
                      draggable={false}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
                      }}
                    />

                    <span className="text-3xl">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-10">
                    <div className="flex items-center gap-6">
                      {isItemIngredient ? (
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => decreaseItem(item._id)}
                            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                          >
                            <FaMinus />
                          </button>
                          <span className="text-2xl">{item.quantity}</span>
                          <button
                            onClick={() => increaseItem(item._id)}
                            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <span className="text-2xl"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.value * item.quantity}</span>
                      <img
                        src="/images/icons/gold.png"
                        draggable={false}
                        className="w-10 h-10 rounded-full"
                      />
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <FaTimes size={28} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Total */}
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

      {/* Proceed to Checkout */}
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
    </div>
  </div>
);
};

export default Cart;


