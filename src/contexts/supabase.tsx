import { createClient, type AuthError, type AuthResponse, type SupabaseClient, type User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type SupabaseContextValue = {
  supabase: SupabaseClient
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<AuthResponse | null>
  signOut: () => Promise<void>
  signUp: (email: string, password: string) => Promise<AuthResponse | null>
}

type SupabaseProviderProps = {
  children: ReactNode
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

export const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession()
        if (error) {
          throw error
        }
        setUser(session?.user ?? null)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    void getInitialSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<AuthResponse | null> => {
    try {
      setLoading(true)
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (response.error) {
        throw response.error
      }
      return response
    } catch (error) {
      setError((error as AuthError).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string): Promise<AuthResponse | null> => {
    try {
      setLoading(true)
      const response = await supabase.auth.signUp({
        email,
        password
      })

      if (response.error) {
        throw response.error
      }
      return response
    } catch (error) {
      setError((error as AuthError).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
    } catch (error) {
      setError((error as AuthError).message)
    } finally {
      setLoading(false)
    }
  }

  const value: SupabaseContextValue = {
    supabase,
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp
  }

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export const useSupabase = (): SupabaseContextValue => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
