import type { FC } from 'react'
import { Main } from './Main.tsx'
import { SupabaseProvider } from './contexts/supabase.tsx'

export const App: FC = () => {
  return (
    <SupabaseProvider>
      <Main />
    </SupabaseProvider>
  )
}
