import { useEffect, useState } from 'react'
import { useSupabase } from '~/contexts/supabase.tsx'

interface GlobalStatistics {
  gamesPlayed: number
  stickCount: number
  stickWins: number
  switchCount: number
  switchWins: number
}

type Choice = number

export const useGlobalStatistics = () => {
  const { supabase } = useSupabase()
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [stickCount, setStickCount] = useState(0)
  const [stickWins, setStickWins] = useState(0)
  const [switchCount, setSwitchCount] = useState(0)
  const [switchWins, setSwitchWins] = useState(0)

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const { data, error } = await supabase.from('statistics').select('*').eq('id', 'global').single()

      if (error) {
        if (error.code === '42P01') {
          console.error('Table does not exist:', error.message)
        } else {
          console.error('Error fetching statistics:', error.message)
        }
        return
      }

      if (data) {
        setGamesPlayed(data.gamesPlayed)
        setStickCount(data.stickCount)
        setStickWins(data.stickWins)
        setSwitchCount(data.switchCount)
        setSwitchWins(data.switchWins)
      } else {
        // Insert default data if it doesn't exist
        const { error: insertError } = await supabase.from('statistics').insert([
          {
            id: 'global',
            gamesPlayed: 0,
            stickCount: 0,
            stickWins: 0,
            switchCount: 0,
            switchWins: 0
          }
        ])
        if (insertError) {
          console.error('Error inserting default stats:', insertError.message)
        }
      }
    }

    void fetchGlobalStats()
  }, [supabase])

  const updateGlobalStatistics = async (choice: Choice, selectedDoor: number, winningDoor: number): Promise<void> => {
    const isWin = choice === winningDoor
    const isStick = choice === selectedDoor

    const updates: GlobalStatistics = {
      gamesPlayed: gamesPlayed + 1,
      stickCount: isStick ? stickCount + 1 : stickCount,
      stickWins: isStick && isWin ? stickWins + 1 : stickWins,
      switchCount: isStick ? switchCount : switchCount + 1,
      switchWins: !isStick && isWin ? switchWins + 1 : switchWins
    }

    const { error } = await supabase.from('statistics').update(updates).eq('id', 'global')

    if (error) {
      console.error('Error updating statistics:', error)
    } else {
      // Update state
      setGamesPlayed(updates.gamesPlayed)
      setStickCount(updates.stickCount)
      setStickWins(updates.stickWins)
      setSwitchCount(updates.switchCount)
      setSwitchWins(updates.switchWins)
    }
  }

  return {
    gamesPlayed,
    stickCount,
    stickWins,
    switchCount,
    switchWins,
    updateGlobalStatistics
  }
}
