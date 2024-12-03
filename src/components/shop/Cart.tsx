import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ItemData } from "@/_common/interfaces/ItemData";
import Layout from "@/components/Layout";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ItemData[];
}

interface CartItem extends ItemData {
  quantity: number;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems }) => {
  const router = useRouter();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

  const isMagical = isMagicalStuffShop(router);

  useEffect(() => {
    if (isMagical) {
      // Inicializa la cantidad para artículos mágicos
      const initializedCart = cartItems.map(item => ({
        ...item,
        quantity: 1,
      }));
      setLocalCartItems(initializedCart);
    } else {
      // Para tienda de equipo, cada artículo solo puede tener una cantidad
      const initializedCart = cartItems.map(item => ({
        ...item,
        quantity: 1,
      }));
      setLocalCartItems(initializedCart);
    }
  }, [cartItems, isMagical]);

  const handleIncrease = (id: string) => {
    setLocalCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setLocalCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setLocalCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const handlePurchase = () => {
    // Aquí puedes manejar la lógica de compra
    console.log("Comprando los siguientes items:", localCartItems);
    // Después de la compra, podrías limpiar el carrito
    onClose();
  };

  if (!isOpen) return null;

  // Calculate total
  const total = 1000;

  return (
    <div className="absolute right-4 top-20 w-[40rem] bg-gray-800 text-white z-50 border border-yellow-600 rounded-lg shadow-2xl animate-slideInFromRight">
      <div className="bg-neutral-800 w-full max-h-[90vh] overflow-auto p-10 rounded-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-100"
        >
          <FaTimes size={36} />
        </button>

        <h2 className="text-5xl font-bold mb-8 text-center">Your Cart</h2>

        {localCartItems.length === 0 ? (
          <p className="text-center text-white">There are no items in your cart.</p>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto scrollbar scrollbar-thumb-medievalGold scrollbar-track-medievalGray">
            <div className="space-y-4">
              {localCartItems.map(item => (
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
                      {isMagical && (
                        <>

                          <div className="flex items-center gap-6">
                            <button
                              onClick={() => handleDecrease(item._id)}
                              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                            >
                              <FaMinus />
                            </button>
                            <span className="text-2xl">{item.quantity}</span>
                            <button
                              onClick={() => handleIncrease(item._id)}
                              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                            >
                              <FaPlus />
                            </button>
                          </div>

                        </>
                      )}

                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.value}</span>
                      <img
                        src="/images/icons/gold.png"
                        draggable={false}
                        className="w-10 h-10 rounded-full"
                      />
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <FaTimes size={28} />
                      </button>


                    </div>

                  </div>
                </div>
              ))}
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

        {/*  Proceed to Checkout */}
        <div className="mt-12 flex justify-center relative">
          <button
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

// Funciones de utilidad para determinar el tipo de tienda
const isEquipmentShop = (router): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "equipment";
}

const isMagicalStuffShop = (router): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "magical_stuff";
}

