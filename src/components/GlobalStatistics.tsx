import type React from 'react'
import { testIds } from '../testIds.js'

interface GlobalStatisticsProps {
  gamesPlayed: number
  switchCount: number
  switchWins: number
  stickCount: number
  stickWins: number
}

const GlobalStatistics: React.FC<GlobalStatisticsProps> = ({
  gamesPlayed,
  switchCount,
  switchWins,
  stickCount,
  stickWins
}) => {
  const switchWinRate = switchCount ? (switchWins / switchCount) * 100 : 0
  const stickWinRate = stickCount ? (stickWins / stickCount) * 100 : 0

  return (
    <div className='mt-8 text-center' data-testid={testIds.globalStats.container}>
      <h2 className='text-2xl mb-4' data-testid={testIds.globalStats.title}>
        Global Statistics
      </h2>
      <p data-testid={testIds.globalStats.gamesPlayed}>
        Games Played: <span data-testid={testIds.globalStats.gamesPlayedValue}>{gamesPlayed}</span>
      </p>
      <p data-testid={testIds.globalStats.switchStats}>
        <span className='text-green-500 font-bold'>Switch</span>: {switchWins}/{switchCount}, {switchWinRate.toFixed(2)}
        %
      </p>
      <p data-testid={testIds.globalStats.stickStats}>
        <span className='text-red-500 font-bold'>Stick</span>: {stickWins}/{stickCount}, {stickWinRate.toFixed(2)}%
      </p>
    </div>
  )
}

export { GlobalStatistics }
