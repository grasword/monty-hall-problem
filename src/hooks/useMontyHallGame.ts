import { useState } from "react";

interface GameState {
  selectedDoor: number | null;
  winningDoor: number;
  revealedDoor: number | null;
  finalChoice: number | null;
}

const useMontyHallGame = () => {
  const [state, setState] = useState<GameState>({
    selectedDoor: null,
    winningDoor: Math.floor(Math.random() * 3),
    revealedDoor: null,
    finalChoice: null,
  });

  const handleDoorClick = (door: number) => {
    if (state.selectedDoor === null) {
      setState((prevState) => ({
        ...prevState,
        selectedDoor: door,
        revealedDoor: revealDoor(door, prevState.winningDoor),
      }));
    }
  };

  const revealDoor = (chosenDoor: number, winningDoor: number) => {
    const doors = [0, 1, 2].filter(
      (door) => door !== chosenDoor && door !== winningDoor
    );
    return doors[Math.floor(Math.random() * doors.length)];
  };

  const handleFinalChoice = (choice: number) => {
    setState((prevState) => ({
      ...prevState,
      finalChoice: choice,
      selectedDoor: choice, // Update selectedDoor to the final choice
      revealedDoor: null, // Reset revealedDoor to show all doors
    }));
  };

  const handleReset = () => {
    setState({
      selectedDoor: null,
      winningDoor: Math.floor(Math.random() * 3),
      revealedDoor: null,
      finalChoice: null,
    });
  };

  return {
    state,
    handleDoorClick,
    handleFinalChoice,
    handleReset,
  };
};

export default useMontyHallGame;
