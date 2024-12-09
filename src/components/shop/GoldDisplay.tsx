import React, { useState, useEffect } from "react";

type GoldDisplayProps = {
  gold: number; // Current gold value
};

const GoldDisplay: React.FC<GoldDisplayProps> = ({ gold }) => {
  const [displayGold, setDisplayGold] = useState(gold); // Displayed gold value
  const [animationType, setAnimationType] = useState<"increase" | "decrease" | null>(null);

  useEffect(() => {
    if (gold > displayGold) {
      setAnimationType("increase");
      startAnimation(displayGold, gold, "increase");
    } else if (gold < displayGold) {
      setAnimationType("decrease");
      startAnimation(displayGold, gold, "decrease");
    }
  }, [gold]);

  const startAnimation = (start: number, end: number, type: "increase" | "decrease") => {
    const step = type === "increase" ? 1 : -1;
    const interval = 20; // Adjust for smoother or faster animation
    let current = start;

    const intervalId = setInterval(() => {
      current += step;
      setDisplayGold(current);

      if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
        clearInterval(intervalId);
        setAnimationType(null);
      }
    }, interval);
  };

  return (
    <div
      className={`w-3/5 border border-medievalSepia rounded-md px-2 py-1 flex items-center gap-3 bg-black/30 transition-transform ${
        animationType === "increase" ? "animate-gold-increase" : ""
      } ${animationType === "decrease" ? "animate-gold-decrease" : ""}`}
    >
      {/* Image Icon */}
      <img
        className="w-11 h-11 rounded-full flex-shrink-0"
        src="/images/icons/gold.png"
        alt="Gold Icon"
      />
      
      {/* Animated Gold Value */}
      <p className="text-4xl pb-2 flex-grow text-center">{displayGold}</p>
    </div>
  );

};

export default GoldDisplay;