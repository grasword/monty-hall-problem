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
    const { error } = await supabase.rpc('update_global_statistics', {
      choice,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      selected_door: selectedDoor,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      winning_door: winningDoor
    })

    if (error) {
      console.error('Error updating statistics:', error)
    } else {
      // Fetch the updated statistics to update the state
      const { data, error: fetchError } = await supabase.from('statistics').select('*').eq('id', 'global').single()

      if (fetchError) {
        console.error('Error fetching updated statistics:', fetchError)
        return
      }

      const updatedStats = data as GlobalStatistics
      setGamesPlayed(updatedStats.gamesPlayed)
      setStickCount(updatedStats.stickCount)
      setStickWins(updatedStats.stickWins)
      setSwitchCount(updatedStats.switchCount)
      setSwitchWins(updatedStats.switchWins)
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
