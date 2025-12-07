/// <reference types="vite/client" />

type ImportMetaEnvAugmented =
  import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
    typeof import('./env').default
  >;

interface ViteTypeOptions {
  strictImportMetaEnv: true;
}

interface ImportMetaEnv extends ImportMetaEnvAugmented {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
