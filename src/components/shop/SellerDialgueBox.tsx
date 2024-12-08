import React, { useState, useEffect, useRef } from 'react';

interface Prompts {
  phrase?: string;
}

export const SellerDialogueBox: React.FC<Prompts> = ({ phrase }) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [isCentered, setIsCentered] = useState(false);
  const [boxHeight, setBoxHeight] = useState(100); // Initial height
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref to track the container size
  const previousHeight = useRef<number>(0); // Store previous height to detect when height increases

  useEffect(() => {
    if (phrase) {
      setVisibleWords([]); // Clear previous words when a new phrase comes in
      setBoxHeight(100); // Reset height for the new phrase
      previousHeight.current = 0; // Reset the previous height

      let words = phrase.split(' ');
      let currentWordIndex = 0;

      const interval = setInterval(() => {
        setVisibleWords((prev) => {
          const updatedWords = [...prev, words[currentWordIndex]];

          if (updatedWords.length > 2) {
            setIsCentered(true); // Start centering when 3 words are visible
          }

          return updatedWords;
        });
        currentWordIndex += 1;

        // After each word is added, check if the container height has increased (wrap occurred)
        if (containerRef.current) {
          const newHeight = containerRef.current.scrollHeight;
          if (newHeight > previousHeight.current) {
            // The height has increased, which means text has wrapped to the next line
            setBoxHeight(newHeight); // Increase the height of the background
            previousHeight.current = newHeight; // Update the previous height
          }
        }

        if (currentWordIndex === words.length) {
          clearInterval(interval); // Stop the interval once all words are shown
        }
      }, 100); // Adjust the interval to control animation speed

      return () => clearInterval(interval); // Clean up interval when component unmounts or phrase changes
    }
  }, [phrase]); // This effect runs whenever the phrase changes

  return (
    <div
      className="flex justify-center items-center text-medievalSepia bg-cover bg-no-repeat bg-center"
      style={{
        width: '525px',
        height: `${boxHeight}px`, // Dynamic height based on content
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        transition: 'height 0.3s ease-in-out', // Smooth height transition
      }}
    >
      <div
        ref={containerRef} // Ref for measuring container size
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
        {/* Tailwind animation for fading in the text */}
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
              animation: fadeIn 0.3s ease-in-out forwards; /* Faster fade-in */
            }
          `}
        </style>

        {/* Render the visible words */}
        {visibleWords.map((word, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fadeIn"
            style={{
              animationDelay: `${index * 0.1}s`, // Speed up word animation (0.1s delay)
              marginRight: '8px', // Consistent space between words
            }}
          >
            {word}
          </span>
        ))}
      </div>
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











