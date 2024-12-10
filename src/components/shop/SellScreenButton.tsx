import React from 'react';

// Define the props for the SellButton component
interface SellButtonProps {
  text: string;
  handleClick: () => void;
  isSelected: boolean; // Flag to determine whether an item is selected
}

const SellScreenButton: React.FC<SellButtonProps> = ({
  text,
  handleClick,
  isSelected,
}) => {
  // Inject the border animation styles directly in the component
  const borderAnimationStyle = `
@keyframes borderMovement {
  0% {
    border-color: #704214; /* Dark sepia */
  }
  25% {
    border-color: #a67c52; /* Warm brown */
  }
  50% {
    border-color: #d2b48c; /* Tan (parchment-like) */
  }
  75% {
    border-color: #c2b280; /* Muted gold */
  }
  100% {
    border-color: #9c661f; /* Burnt orange */
  }
}
.animate-borderMovement {
  animation: borderMovement 1.5s linear infinite;
}
  `;

  // Tailwind class for dynamic styling based on selection
  const buttonClass = isSelected
    ? 'from-transparent bg-darkSepia hover:bg-medievalSepia to-transparent border-4 border-transparent transform scale-100 transition-all duration-300 hover:scale-110'
    : 'from-transparent bg-medievalSepia to-transparent border-4 border-transparent cursor-not-allowed opacity-50';

  return (
    <div>
      {/* Injecting the border animation styles into the component */}
      <style>{borderAnimationStyle}</style>
      
      <button
      className={`px-12 py-6 text-2xl rounded-full text-black ${buttonClass}`}
      onClick={isSelected ? handleClick : undefined} // Only enable the click if an item is selected
      disabled={!isSelected} // Disable the button if no item is selected
    >
      {text}
    </button>
    </div>
  );
};

export default SellScreenButton;

