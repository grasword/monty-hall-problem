import type { FC } from 'react'
import { testIds } from '~/testIds.js'

interface GlobalStatisticsProps {
  gamesPlayed: number
  switchCount: number
  switchWins: number
  stickCount: number
  stickWins: number
}

const GlobalStatistics: FC<GlobalStatisticsProps> = ({
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
      <h2 className='text-2xl mb-4'>Global Statistics</h2>
      <p>Games Played: {gamesPlayed}</p>
      <p>
        <span className='text-green-500 font-bold'>Switch</span>: {switchWins}/{switchCount}, {switchWinRate.toFixed(2)}
        %
      </p>
      <p>
        <span className='text-red-500 font-bold'>Stick</span>: {stickWins}/{stickCount}, {stickWinRate.toFixed(2)}%
      </p>
    </div>
  )
}

export { GlobalStatistics }
