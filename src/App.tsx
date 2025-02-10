import React, { useState } from "react";
import Door from "./components/Door";
import "./styles/App.css";
import { testIds } from "./testIds";

const App: React.FC = () => {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [winningDoor, setWinningDoor] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);

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

  const handleFinalChoice = (choice: number) => {
    setFinalChoice(choice);
  };

  const handleReset = () => {
    setSelectedDoor(null);
    setRevealedDoor(null);
    setFinalChoice(null);
    setWinningDoor(Math.floor(Math.random() * 3));
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      data-testid={testIds.app.container}
    >
      <h1 className="text-4xl font-bold mb-8" data-testid={testIds.app.title}>
        Monty Hall Problem
      </h1>
      <h2 className="text-2xl mb-4" data-testid={testIds.app.subtitle}>
        Select a door:
      </h2>
      <div className="flex">
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
      {selectedDoor !== null &&
        revealedDoor !== null &&
        finalChoice === null && (
          <div className="mt-8 text-center">
            <p className="mb-4">
              You chose door {selectedDoor + 1}. Door {revealedDoor + 1} was
              revealed.
            </p>
            <p className="mb-4">
              Do you want to stick with your choice or switch?
            </p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded mr-4"
              onClick={() => handleFinalChoice(selectedDoor)}
              data-testid={testIds.app.stickButton}
            >
              Stick
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleFinalChoice(3 - selectedDoor - revealedDoor)}
              data-testid={testIds.app.switchButton}
            >
              Switch
            </button>
          </div>
        )}
      {finalChoice !== null && (
        <div className="mt-8 text-center">
          <p className="mb-4" data-testid={testIds.app.resultMessage}>
            You chose door {finalChoice + 1}.
          </p>
          <p className="mb-4">
            {finalChoice === winningDoor ? "You win!" : "You lose!"}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleReset}
            data-testid={testIds.app.playAgainButton}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
