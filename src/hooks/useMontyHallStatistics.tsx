import { useState } from 'react'

const useMontyHallStatistics = () => {
  const [switchCount, setSwitchCount] = useState(0)
  const [switchWins, setSwitchWins] = useState(0)
  const [stickCount, setStickCount] = useState(0)
  const [stickWins, setStickWins] = useState(0)

  const updateStatistics = (choice: number, selectedDoor: number, winningDoor: number) => {
    if (choice === selectedDoor) {
      setStickCount(stickCount + 1)
      if (choice === winningDoor) {
        setStickWins(stickWins + 1)
      }
    } else {
      setSwitchCount(switchCount + 1)
      if (choice === winningDoor) {
        setSwitchWins(switchWins + 1)
      }
    }
  }

  return {
    switchCount,
    switchWins,
    stickCount,
    stickWins,
    updateStatistics
  }
}

export { useMontyHallStatistics }
