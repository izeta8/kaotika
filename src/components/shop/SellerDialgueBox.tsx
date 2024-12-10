import React, { useState, useEffect } from 'react';

interface Prompts {
  phrase?: string;
}

export const SellerDialogueBox: React.FC<Prompts> = ({ phrase }) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [isCentered, setIsCentered] = useState(false);
  const [boxHeight, setBoxHeight] = useState(100); // Initial height

  useEffect(() => {
    if (phrase) {
      // Split the phrase into words and set up a state for the visible words
      const words = phrase.split(' ');
      setVisibleWords(words);

      // Center the text if there are enough words
      if (words.length > 2) {
        setIsCentered(true);
      }
    }
  }, [phrase]);

  // Use the phrase as a key to force re-render on change
  return (
    <div
      key={phrase} // Unique key based on the phrase to reset the animation
      className="flex justify-center items-center text-medievalSepia bg-cover bg-no-repeat bg-center"
      style={{
        width: '525px',
        height: `${boxHeight}px`, // Dynamic height based on content
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        transition: 'height 0.3s ease-in-out', // Smooth height transition
      }}
    >
      <div
        className={`text-4xl pl-8 pr-8 mb-4 ${
          isCentered ? 'text-center' : 'text-left'
        } text-white font-bold`} // Bigger text size and bold
        style={{
          whiteSpace: 'normal', // Ensure the text wraps correctly
          wordWrap: 'break-word', // Handle word breaking if necessary
          wordBreak: 'break-word', // Prevent overflow by breaking long words
          display: 'inline-block', // Keep the words in one block
          width: '100%', // Ensure words wrap correctly and keep the text aligned
          minHeight: '100px', // Fix the minimum height so layout doesn’t shift
          textAlign: isCentered ? 'center' : 'left', // Dynamically change alignment
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)', // Text shadow for better visibility
          color: 'rgba(191, 142, 89, 1)',
        }}
      >
        {/* Render the visible words with CSS animation */}
        {visibleWords.map((word, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fadeIn"
            style={{
              animation: `fadeIn 0.3s ease-in-out forwards`,
              animationDelay: `${index * 0.1}s`, // Delay for each word
              marginRight: '8px', // Consistent space between words
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Inline CSS for animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fadeIn {
            opacity: 0;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    </div>
  );
};


// The function to create the seller's message
export function createItemSellPriceMessage(message: string, itemName: string, itemValue: number): string {
  let returnMessage = message;
  returnMessage = returnMessage.replace("{itemName}", itemName);
  returnMessage = returnMessage.replace("{price}", itemValue.toString());
  return returnMessage;
}











