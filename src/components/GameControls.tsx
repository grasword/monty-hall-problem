import React from "react";
import { testIds } from "../testIds";

interface GameControlsProps {
  selectedDoor: number | null;
  revealedDoor: number | null;
  finalChoice: number | null;
  winningDoor: number;
  handleFinalChoice: (choice: number) => void;
  handleReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  selectedDoor,
  revealedDoor,
  finalChoice,
  winningDoor,
  handleFinalChoice,
  handleReset,
}) => {
  return (
    <>
      {selectedDoor !== null && revealedDoor !== null && finalChoice === null && (
        <div className="mt-8 text-center">
          <p className="mb-4">
            You chose door {selectedDoor + 1}. Door {revealedDoor + 1} was
            revealed.
          </p>
          <p className="mb-4">Do you want to stick with your choice or switch?</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded mr-4"
            onClick={() => handleFinalChoice(selectedDoor)}
            data-testid={testIds.app.stickButton}
          >
            Stick
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
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
          <p className="mb-4">{finalChoice === winningDoor ? "You win!" : "You lose!"}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleReset}
            data-testid={testIds.app.playAgainButton}
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
};

export default GameControls;
