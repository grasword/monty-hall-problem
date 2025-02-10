import React from "react";
import { testIds } from "../testIds";

interface DoorProps {
  doorNumber: number;
  isSelected: boolean;
  isWinning: boolean;
  isRevealed: boolean;
  onSelect: (doorNumber: number) => void;
}

const Door: React.FC<DoorProps> = ({
  doorNumber,
  isSelected,
  isWinning,
  isRevealed,
  onSelect,
}) => {
  const handleClick = () => {
    if (!isRevealed) {
      onSelect(doorNumber);
    }
  };

  return (
    <div
      className={`w-32 h-64 m-2 bg-white border-2 border-gray-800 rounded cursor-pointer flex items-center justify-center transition-transform transform ${
        isSelected ? "bg-yellow-400" : ""
      } ${isWinning && isRevealed ? "bg-green-400" : ""} ${
        isRevealed && !isWinning ? "bg-red-400" : ""
      }`}
      onClick={handleClick}
      data-testid={testIds.door(doorNumber).container}
    >
      <div
        className="text-center text-3xl font-bold" // Updated font size
        data-testid={testIds.door(doorNumber).label}
      >
        {isRevealed ? (isWinning ? "🏆" : "🐐") : `${doorNumber + 1}`}
      </div>
    </div>
  );
};

export default Door;
