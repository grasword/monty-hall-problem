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
      className={`door ${isSelected ? "selected" : ""} ${
        isWinning ? "winning" : ""
      }`}
      onClick={handleClick}
    >
      Door {doorNumber}
    </div>
  );
};

export default Door;
