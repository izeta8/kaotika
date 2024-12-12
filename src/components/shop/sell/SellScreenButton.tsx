import React from 'react';

interface SellButtonProps {
  text: string;
  handleClick: () => void;
  isSelected: boolean;
}

const SellScreenButton: React.FC<SellButtonProps> = ({ text, handleClick, isSelected }) => {
  // Tailwind class for dynamic styling based on selection
  const buttonClass = isSelected
    ? 'bg-darkSepia hover:bg-medievalSepia to-transparent border-4 border-transparent transform scale-100 transition-all duration-300 hover:scale-110 animate-background' 
    : 'bg-gray-500 text-white border-4 border-transparent cursor-not-allowed opacity-50'; // Static grey background when not selected
  
  return (
    <div className="flex justify-center items-center mb-4">
      {/* Injecting the border animation styles into the component */}
      <style>{borderAnimationStyle}</style>
      <style>{backgroundAnimationStyle}</style>
      
      <button
        className={`px-12 py-8 text-5xl font-semibold rounded-lg text-black ${buttonClass}`}
        onClick={isSelected ? handleClick : undefined} // Only enable the click if an item is selected
        disabled={!isSelected} // Disable the button if no item is selected
      >
        {text}
      </button>
    </div>
  );
};

export default SellScreenButton;

// Injecting the border animation styles directly in the component
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

// Injecting background color animation styles
const backgroundAnimationStyle = `
  @keyframes backgroundMovement {
    0% {
      background-color: #704214;
    }
    50% {
      background-color: #a67c52;
    }
    100% {
      background-color: #704214;
    }
  }
  .animate-background {
    animation: backgroundMovement 3s ease-in-out infinite;
  }
`;

