import React, { useState, useEffect } from 'react';

interface Prompts {
  phrase: string;
}

export const SellerDialogueBox: React.FC<Prompts> = ({ phrase }) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [isCentered, setIsCentered] = useState(false);

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
      key={phrase} 
      className="flex justify-center items-center text-medievalSepia bg-cover bg-no-repeat bg-center"
      style={{
        width: '528px',
        height: `280px`, 
        transition: 'height 0.3s ease-in-out', 
        backgroundImage: 'url(/images/shop/seller_dialogue_box.png)'
      }}
    >
      <div
        className={`text-4xl pl-8 pr-8 mb-4 ${
          isCentered ? 'text-center' : 'text-left'
        } text-white `} 
        style={{
          whiteSpace: 'normal', 
          wordWrap: 'break-word', 
          wordBreak: 'break-word', 
          display: 'inline-block',
          width: '100%', 
          minHeight: '100px', 
          textAlign: isCentered ? 'center' : 'left', 
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
              textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)', // Stronger shadow effect
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};













