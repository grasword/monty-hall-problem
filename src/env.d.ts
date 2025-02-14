// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_API_KEY: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
