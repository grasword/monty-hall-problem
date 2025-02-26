import type { FC } from 'react'
import { useState } from 'react'
import { Door } from '~/components/Door.tsx'
import { GameControls } from '~/components/GameControls.tsx'
import { GlobalStatistics } from '~/components/GlobalStatistics.tsx'
import { Statistics } from '~/components/Statistics.tsx'
import { useGlobalStatistics } from '~/hooks/useGlobalStatistics.tsx'
import { useMontyHallGame } from '~/hooks/useMontyHallGame'
import { useMontyHallStatistics } from '~/hooks/useMontyHallStatistics.tsx'
import { testIds } from '~/testIds.ts'

export const Main: FC = () => {
  const { state, handleDoorClick, handleFinalChoice, handleReset } = useMontyHallGame()
  const { switchCount, switchWins, stickCount, stickWins, updateStatistics } = useMontyHallStatistics()
  const {
    gamesPlayed,
    switchCount: globalSwitchCount,
    switchWins: globalSwitchWins,
    stickCount: globalStickCount,
    stickWins: globalStickWins,
    updateGlobalStatistics
  } = useGlobalStatistics()
  const [showGlobalStats, setShowGlobalStats] = useState(false)

  const handleFinalChoiceWithStats = (choice: number) => {
    handleFinalChoice(choice)
    if (state.selectedDoor !== null) {
      updateStatistics(choice, state.selectedDoor, state.winningDoor)
    }
    if (state.selectedDoor !== null) {
      void updateGlobalStatistics(choice, state.selectedDoor, state.winningDoor)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center h-screen bg-gray-100'
      data-testid={testIds.main.container}
    >
      <h1 className='text-4xl font-bold mb-8' data-testid={testIds.main.title}>
        Monty Hall Problem
      </h1>
      <h2 className='text-2xl mb-4' data-testid={testIds.main.subtitle}>
        Select a door:
      </h2>
      <div className='flex'>
        {Array.from({ length: 3 }, (_, index) => {
          const doorKey = `door-${index}`
          return (
            <Door
              key={doorKey}
              doorNumber={index}
              isSelected={state.selectedDoor === index}
              isWinning={state.winningDoor === index}
              isRevealed={state.finalChoice !== null || state.revealedDoor === index}
              onSelect={handleDoorClick}
            />
          )
        })}
      </div>
      <GameControls
        selectedDoor={state.selectedDoor}
        revealedDoor={state.revealedDoor}
        finalChoice={state.finalChoice}
        winningDoor={state.winningDoor}
        handleFinalChoice={handleFinalChoiceWithStats}
        handleReset={handleReset}
      />
      <Statistics switchCount={switchCount} switchWins={switchWins} stickCount={stickCount} stickWins={stickWins} />
      <button
        type='button'
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        onClick={() => setShowGlobalStats(!showGlobalStats)}
        data-testid={testIds.main.toggleGlobalStats}
      >
        {showGlobalStats ? 'Hide Global Statistics' : 'Show Global Statistics'}
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
