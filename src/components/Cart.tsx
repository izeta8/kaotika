// components/Cart.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa'; 

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Cart</h2>

        <div>
          <p>No hay artículos en el carrito.</p>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
