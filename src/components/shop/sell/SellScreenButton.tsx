import React from 'react';

interface SellButtonProps {
  text: string;
  handleClick: () => void;
  isSelected: boolean;
}

const SellScreenButton: React.FC<SellButtonProps> = ({text, handleClick, isSelected, }) => {
  
  // Tailwind class for dynamic styling based on selection
  const buttonClass = isSelected
    ? 'from-transparent bg-darkSepia hover:bg-medievalSepia to-transparent border-4 border-transparent transform scale-100 transition-all duration-300 hover:scale-110'
    : 'from-transparent bg-medievalSepia to-transparent border-4 border-transparent cursor-not-allowed opacity-50';

  return (
    <div>
      {/* Injecting the border animation styles into the component */}
      <style>{borderAnimationStyle}</style>
      
      <button
      className={`px-6 py-2 text-2xl rounded-lg text-black ${buttonClass}`}
      onClick={isSelected ? handleClick : undefined} // Only enable the click if an item is selected
      disabled={!isSelected} // Disable the button if no item is selected
    >
      {text}
    </button>
    </div>
  );
};

export default SellScreenButton;

// Inject the border animation styles directly in the component
const borderAnimationStyle = `
    @keyframes borderMovement {
      0% {
        border-color: #704214; 
      }
      25% {
        border-color: #a67c52; 
      }
      50% {
        border-color: #d2b48c; 
      }
      75% {
        border-color: #9c661f; 
      }
      100% {
        border-color: #704214;
      }
    }
    .animate-borderMovement {
      animation: borderMovement 1.5s linear infinite;
    }
  `;