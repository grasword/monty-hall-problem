import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [
    react({
      strictMode: false
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      // biome-ignore lint/style/useNamingConvention:
      SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: false }),
      // biome-ignore lint/style/useNamingConvention:
      SUPABASE_ANON_KEY: envField.string({ context: 'client', access: 'public', optional: false })
    }
  }
})
