import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Equipment {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  equipment: Equipment[];
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, ingredients, equipment }) => {
  const [ingredientList, setIngredientList] = useState(ingredients);
  const [equipmentList, setEquipmentList] = useState(equipment);

  if (!isOpen) return null;

  const handleQuantityChange = (id: number, delta: number) => {
    setIngredientList((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, quantity: Math.max(1, ingredient.quantity + delta) }
          : ingredient
      )
    );
  };

  const handleRemoveIngredient = (id: number) => {
    setIngredientList((prev) => prev.filter((ingredient) => ingredient.id !== id));
  };

  const handleRemoveEquipment = (id: number) => {
    setEquipmentList((prev) => prev.filter((equipment) => equipment.id !== id));
  };

  // Calculate total
  const ingredientTotal = ingredientList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const equipmentTotal = equipmentList.reduce((sum, item) => sum + item.price, 0);
  const total = ingredientTotal + equipmentTotal;

  return (
    <div className="absolute right-4 top-20 w-[40rem] bg-gray-800 text-white z-50 border border-yellow-600 rounded-lg shadow-2xl">
      <div className="bg-neutral-800 w-full max-h-[85vh] overflow-auto p-10 rounded-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-100"
        >
          <FaTimes size={36} />
        </button>

        {/* Title */}
        <h2 className="text-5xl font-bold mb-10 text-center">Your Cart</h2>

        {/* Items */}
        {ingredientList.length === 0 && equipmentList.length === 0 ? (
          <p className="text-center text-2xl">There are no items in your cart.</p>
        ) : (
          <div className="space-y-10">
            {/* Magic Stuff */}
            {ingredientList.length > 0 && (
              <div>
                <h3 className="text-4xl font-bold mb-8">Magic Stuff</h3>
                <div className="max-h-[30vh] overflow-y-auto space-y-6 pr-2">
                  <ul className="space-y-6">
                    {ingredientList.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex justify-between items-center border-b border-gray-700 pb-4"
                      >
                        <span className="text-3xl">{ingredient.name}</span>
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => handleQuantityChange(ingredient.id, -1)}
                            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                          >
                            -
                          </button>
                          <span className="text-2xl">{ingredient.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(ingredient.id, 1)}
                            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 text-2xl"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{ingredient.price * ingredient.quantity}</span>
                          <img
                            src="/images/icons/gold.png"
                            draggable={false}
                            className="w-10 h-10 rounded-full"
                          />
                          <button
                            onClick={() => handleRemoveIngredient(ingredient.id)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            <FaTimes size={28} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Equipment */}
            {equipmentList.length > 0 && (
              <div>
                <h3 className="text-4xl font-bold mb-8">Equipment</h3>
                <div className="max-h-[30vh] overflow-y-auto space-y-6 pr-2">
                  <ul className="space-y-6">
                    {equipmentList.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center border-b border-gray-700 pb-4"
                      >
                        <span className="text-3xl">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.price}</span>
                          <img
                            src="/images/icons/gold.png"
                            draggable={false}
                            className="w-10 h-10 rounded-full"
                          />
                          <button
                            onClick={() => handleRemoveEquipment(item.id)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            <FaTimes size={28} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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

        {/* Buttons */}
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

