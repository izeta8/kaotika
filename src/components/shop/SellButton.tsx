import React from 'react';

// Define the props for the SellButton component
interface SellButtonProps {
  text: string;
  handleClick: () => void;
  isSelected: boolean; // Flag to determine whether an item is selected
}

const SellButton: React.FC<SellButtonProps> = ({
  text,
  handleClick,
  isSelected,
}) => {
  // Inject the border animation styles directly in the component
  const borderAnimationStyle = `
    @keyframes borderMovement {
      0% {
        border-color: red;
      }
      25% {
        border-color: orange;
      }
      50% {
        border-color: yellow;
      }
      75% {
        border-color: green;
      }
      100% {
        border-color: blue;
      }
    }
    .animate-borderMovement {
      animation: borderMovement 1.5s linear infinite;
    }
  `;

  // Tailwind class for dynamic styling based on selection
  const buttonClass = isSelected
    ? 'bg-gradient-to-r from-transparent via-red-900 to-transparent border-4 border-transparent animate-borderMovement transform scale-100 transition-all duration-300 hover:scale-110'
    : 'bg-gradient-to-r from-transparent via-gray-800 to-transparent border-4 border-transparent cursor-not-allowed opacity-50';

  return (
    <div>
      {/* Injecting the border animation styles into the component */}
      <style>{borderAnimationStyle}</style>
      
      <button
      className={`px-12 py-6 text-2xl font-bold text-medievalSepia rounded-full ${buttonClass}`}
      onClick={isSelected ? handleClick : undefined} // Only enable the click if an item is selected
      disabled={!isSelected} // Disable the button if no item is selected
    >
      {text}
    </button>
    </div>
  );
};

export default SellButton;

