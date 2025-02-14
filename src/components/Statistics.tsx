import type { FC } from 'react'

interface StatisticsProps {
  switchCount: number
  switchWins: number
  stickCount: number
  stickWins: number
}

const Statistics: FC<StatisticsProps> = ({ switchCount, switchWins, stickCount, stickWins }) => {
  const switchWinRate = switchCount ? (switchWins / switchCount) * 100 : 0
  const stickWinRate = stickCount ? (stickWins / stickCount) * 100 : 0

  return (
    <div className='mt-8 text-center'>
      <h2 className='text-2xl mb-4'>Statistics</h2>
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

export { Statistics }
