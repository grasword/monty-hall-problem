import type React from 'react'
import { useState } from 'react'
import { Door } from './components/Door.jsx'
import { GameControls } from './components/GameControls.jsx'
import { GlobalStatistics } from './components/GlobalStatistics.jsx'
import { Statistics } from './components/Statistics.jsx'
import { useGlobalStatistics } from './hooks/useGlobalStatistics.js'
import { useMontyHallGame } from './hooks/useMontyHallGame.js'
import { useMontyHallStatistics } from './hooks/useMontyHallStatistics.js'
import './styles/App.css'
import { testIds } from './testIds.js'

const App: React.FC = () => {
  const { state, handleDoorClick, handleFinalChoice, handleReset } = useMontyHallGame();
  const { switchCount, switchWins, stickCount, stickWins, updateStatistics } = useMontyHallStatistics();
  const { gamesPlayed, switchCount: globalSwitchCount, switchWins: globalSwitchWins, stickCount: globalStickCount, stickWins: globalStickWins, updateGlobalStatistics } = useGlobalStatistics();
  const [showGlobalStats, setShowGlobalStats] = useState(false);

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
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowGlobalStats(!showGlobalStats)}
      >
        {showGlobalStats ? "Hide Global Statistics" : "Show Global Statistics"}
      </button>
      {showGlobalStats && (
        <GlobalStatistics
          gamesPlayed={gamesPlayed}
          switchCount={globalSwitchCount}
          switchWins={globalSwitchWins}
          stickCount={globalStickCount}
          stickWins={globalStickWins}
        />
      )}
    </div>
  )
}

export { App }
