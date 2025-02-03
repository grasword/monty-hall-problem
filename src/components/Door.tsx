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
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(doorNumber);
  };

  return (
    <div
      className={`w-24 h-48 m-2 bg-white border-2 border-gray-800 rounded cursor-pointer transition-transform transform ${
        isSelected ? "bg-yellow-400" : ""
      } ${isWinning ? "bg-green-400" : ""}`}
      onClick={handleClick}
    >
      Door {doorNumber}
    </div>
  );
};

export default Door;
