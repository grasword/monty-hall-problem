import React from "react";

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
      className={`w-24 h-48 m-2 bg-white border-2 border-gray-800 rounded cursor-pointer flex items-center justify-center transition-transform transform ${
        isSelected ? "bg-yellow-400" : ""
      } ${isWinning && isRevealed ? "bg-green-400" : ""} ${
        isRevealed && !isWinning ? "bg-red-400" : ""
      }`}
      onClick={handleClick}
    >
      <div className="text-center text-xl font-bold">
        {isRevealed ? (isWinning ? "🏆" : "🐐") : `Door ${doorNumber + 1}`}
      </div>
    </div>
  );
};

export default Door;
