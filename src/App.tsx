import type { FC } from 'react'
import { SupabaseProvider } from '~/contexts/supabase.tsx'
import { Main } from '~/Main.tsx'
import type { AppConfig } from '~/types.ts'

type AppProps = {
  config: AppConfig
}

export const App: FC<AppProps> = ({ config }) => {
  return (
    <SupabaseProvider config={config.supabase}>
      <Main />
    </SupabaseProvider>
  )
}
