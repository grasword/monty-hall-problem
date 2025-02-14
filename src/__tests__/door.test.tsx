import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Door } from '~/components/Door.tsx'
import { testIds } from '~/testIds.ts'

describe('Door Component', () => {
  const handleSelect = vi.fn()

  it('should render the door number', () => {
    render(<Door doorNumber={0} isSelected={false} isWinning={false} isRevealed={false} onSelect={handleSelect} />)
    expect(screen.getByTestId(testIds.door(0).label).textContent).toBe('1')
  })

  it('should call onSelect when clicked', () => {
    render(<Door doorNumber={0} isSelected={false} isWinning={false} isRevealed={false} onSelect={handleSelect} />)
    fireEvent.click(screen.getByTestId(testIds.door(0).container))
    expect(handleSelect).toHaveBeenCalledWith(0)
  })

  it('should display a trophy if the door is winning and revealed', () => {
    render(<Door doorNumber={0} isSelected={false} isWinning={true} isRevealed={true} onSelect={handleSelect} />)
    expect(screen.getByTestId(testIds.door(0).label).textContent).toBe('🏆')
  })

  it('should display a goat if the door is not winning and revealed', () => {
    render(<Door doorNumber={0} isSelected={false} isWinning={false} isRevealed={true} onSelect={handleSelect} />)
    expect(screen.getByTestId(testIds.door(0).label).textContent).toBe('🐐')
  })
})
