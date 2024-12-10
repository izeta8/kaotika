import React, { useState, useEffect } from 'react';

interface CartButtonProps {
  cartItemCount: number;
  onCartClick: () => void;
  isCartAnimating: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ cartItemCount, onCartClick, isCartAnimating }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(isCartAnimating);

  useEffect(() => {
    setIsAnimating(isCartAnimating);
  }, [isCartAnimating]);

  return (
    <div className="fixed w-80 h-80 top-[3%] left-[87%] z-50 flex flex-col gap-4 justify-center items-center">
    <button
        onClick={onCartClick}
        className={`relative px-8 py-6 rounded-full transition transform focus:outline-none ${
        isCartAnimating
            ? 'scale-[1.4] opacity-90 duration-500 ease-in-out'
            : 'hover:scale-105'
        }`}
    >
        <img
        src="/images/shop/buy/Cart.png"
        className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px]"
        draggable={false}
        />
        {cartItemCount > 0 && (
        <span className="relative top-[-70px] left-3 inline-flex items-center justify-center w-7 h-7 text-4xl leading-none text-medievalSepia transform translate-x-1/2 -translate-y-1/2">
            {cartItemCount}
        </span>
        )}
    </button>
    </div>
  );
};
export default CartButton;