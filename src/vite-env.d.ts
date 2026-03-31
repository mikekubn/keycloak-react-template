/// <reference types="vite/client" />
/** biome-ignore-all lint/correctness/noUnusedVariables: vite */
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_KEYCLOAK_ARTIFACT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
