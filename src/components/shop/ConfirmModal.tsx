import { CartItem } from '@/_common/interfaces/CartItem';
import { MouseEventHandler } from 'react';
import React from 'react';

interface ConfirmModalProps {
  isBuy: boolean,
  isOpen: boolean,
  onCancel: Function,
  onConfirm: Function,
  product: CartItem
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isBuy, isOpen, onCancel, onConfirm, product }) => {

  if (!isOpen) return null;
  if (!product) return null;

  const buttonStyle = "bg-darkSepia text-black px-4 py-2 rounded hover:bg-medievalSepia transition text-2xl";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div
        className="absolute p-5 flex flex-col text-medievalSepia bg-cover bg-no-repeat bg-center rounded-lg shadow-lg animate-slideIn"
        style={{
          backgroundImage: 'url(/images/shop/seller_dialogue_box.png)',
          width: 656,
          height: 350,
        }}
      >
        <h2 className="p-6 text-center text-4xl">
          {`Are you sure you want to ${isBuy ? 'buy' : 'sell'} ${product.name}?`}
        </h2>

        {(product.type === "ingredient") ?
          <img
            src={product.image}
            alt={product.name}
            draggable={false}
            className="w-28 h-28 object-cover rounded-full mx-auto my-3"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
            }}
          />
          :
          <img
            src={product.image}
            alt={product.name}
            draggable={false}
            className="w-28 h-28 object-cover rounded mx-auto my-5"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/shop/buy/interrogation_sign.png";
            }}
          />
        }

        <div className="mt-2 flex justify-center gap-6">

          {/* NO Button */}
          <button
            onClick={() => onCancel()}
            className={buttonStyle}
          >
            NO
          </button>

          {/* YES Button */}
          <button
            onClick={() => onConfirm(product)}
            className={buttonStyle}
          >
            YES
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
