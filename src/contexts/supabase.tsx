import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext, type FC, type ReactNode } from 'react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY

interface SupabaseContextType {
  supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export const SupabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
