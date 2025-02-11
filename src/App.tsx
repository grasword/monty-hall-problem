import React from "react";
import Door from "./components/Door";
import GameControls from "./components/GameControls";
import Statistics from "./components/Statistics";
import useGlobalStatistics from "./hooks/useGlobalStatistics";
import useMontyHallGame from "./hooks/useMontyHallGame";
import useMontyHallStatistics from "./hooks/useMontyHallStatistics";
import "./styles/App.css";
import { testIds } from "./testIds";

const App: React.FC = () => {
  const { state, handleDoorClick, handleFinalChoice, handleReset } = useMontyHallGame();
  const { switchCount, switchWins, stickCount, stickWins, updateStatistics } = useMontyHallStatistics();
  const { gamesPlayed, stickCount: globalStickCount, stickWins: globalStickWins, switchCount: globalSwitchCount, switchWins: globalSwitchWins, updateGlobalStatistics } = useGlobalStatistics();

  const handleFinalChoiceWithStats = (choice: number) => {
    handleFinalChoice(choice);
    updateStatistics(choice, state.selectedDoor!, state.winningDoor);
    updateGlobalStatistics(choice, state.selectedDoor!, state.winningDoor);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100" data-testid={testIds.app.container}>
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
            isSelected={state.selectedDoor === index}
            isWinning={state.winningDoor === index}
            isRevealed={state.finalChoice !== null || state.revealedDoor === index}
            onSelect={handleDoorClick}
          />
        ))}
      </div>
      <GameControls
        selectedDoor={state.selectedDoor}
        revealedDoor={state.revealedDoor}
        finalChoice={state.finalChoice}
        winningDoor={state.winningDoor}
        handleFinalChoice={handleFinalChoiceWithStats}
        handleReset={handleReset}
      />
      <Statistics
        switchCount={switchCount}
        switchWins={switchWins}
        stickCount={stickCount}
        stickWins={stickWins}
      />
      <div className="mt-8 text-center">
        <h2 className="text-2xl mb-4">Global Statistics</h2>
        <p>Games Played: {gamesPlayed}</p>
        <p>Switch Count: {globalSwitchCount}</p>
        <p>Switch Wins: {globalSwitchWins}</p>
        <p>Stick Count: {globalStickCount}</p>
        <p>Stick Wins: {globalStickWins}</p>
      </div>
    </div>
  );
};

export default App;
