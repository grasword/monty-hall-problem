import type React from 'react'
import { testIds } from '../testIds.js'

interface DoorProps {
  doorNumber: number
  isSelected: boolean
  isWinning: boolean
  isRevealed: boolean
  onSelect: (doorNumber: number) => void
}

const Door: React.FC<DoorProps> = ({ doorNumber, isSelected, isWinning, isRevealed, onSelect }) => {
  const handleClick = () => {
    if (!isRevealed) {
      onSelect(doorNumber)
    }
  }

  return (
    <button
      type='button'
      className={`w-32 h-64 m-2 bg-white border-2 border-gray-800 rounded cursor-pointer flex items-center justify-center transition-transform transform ${
        isSelected ? 'bg-yellow-400' : ''
      } ${isWinning && isRevealed ? 'bg-green-400' : ''} ${isRevealed && !isWinning ? 'bg-red-400' : ''}`}
      onClick={handleClick}
      onKeyUp={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      tabIndex={0}
      data-testid={testIds.door(doorNumber).container}
    >
      <div className='text-center text-3xl font-bold' data-testid={testIds.door(doorNumber).label}>
        {isRevealed ? (isWinning ? '🏆' : '🐐') : `${doorNumber + 1}`}
      </div>
    </button>
  )
}

export { Door }
