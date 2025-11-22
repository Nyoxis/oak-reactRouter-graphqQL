/// <reference types="vite/client" />
/// <reference types="@vitejs/plugin-rsc/types" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL?: string
  readonly VITE_BACKEND_PORT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
