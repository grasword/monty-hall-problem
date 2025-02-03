import React, { useState } from "react";
import Door from "./components/Door";
import "./styles/App.css";

const App: React.FC = () => {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [winningDoor] = useState<number>(Math.floor(Math.random() * 3));
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);

  const handleDoorClick = (door: number) => {
    if (selectedDoor === null) {
      setSelectedDoor(door);
      revealDoor(door);
    }
  };

  const revealDoor = (chosenDoor: number) => {
    const doors = [0, 1, 2].filter(
      (door) => door !== chosenDoor && door !== winningDoor
    );
    const doorToReveal = doors[Math.floor(Math.random() * doors.length)];
    setRevealedDoor(doorToReveal);
  };

  const handleReset = () => {
    setSelectedDoor(null);
    setRevealedDoor(null);
  };

  return (
    <div className="App">
      <h1>Monty Hall Problem</h1>
      <div className="doors">
        {Array.from({ length: 3 }, (_, index) => (
          <Door
            key={index}
            doorNumber={index}
            isSelected={selectedDoor === index}
            isWinning={winningDoor === index}
            isRevealed={revealedDoor === index}
            onSelect={handleDoorClick}
          />
        ))}
      </div>
      {selectedDoor !== null && (
        <div className="result">
          {revealedDoor !== null && (
            <p>
              You chose door {selectedDoor + 1}. Door {revealedDoor + 1} was
              revealed.
            </p>
          )}
          <p>{selectedDoor === winningDoor ? "You win!" : "You lose!"}</p>
          <button onClick={handleReset}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
