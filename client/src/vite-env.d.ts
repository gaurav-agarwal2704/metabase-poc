/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_METABASE_INSTANCE_URL: string;
  readonly VITE_METABASE_API_KEY: string;
  readonly VITE_AUTH_MODE: string;
  readonly VITE_DASHBOARD_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
