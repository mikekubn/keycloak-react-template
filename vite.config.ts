import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";

import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import { extractEnvVariableKeycloakArtifactId } from "./utils";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const artifactId = extractEnvVariableKeycloakArtifactId("VITE_KEYCLOAK_ARTIFACT_ID", env.VITE_KEYCLOAK_ARTIFACT_ID);
  const name = `keycloak-react-template-${artifactId}`;

  return {
    resolve: {
      alias: {
        "@/utils": fileURLToPath(new URL("./utils", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    plugins: [
      react(),
      svgr(),
      keycloakify({
        themeName: name,
        artifactId: name,
        accountThemeImplementation: "none",
        keycloakVersionTargets: {
          /**
           * Keycloak 26 is supported. Use the keycloak-theme-for-kc-all-other-version.jar.
           */
          "all-other-versions": `${name}-kc-all-other-versions.jar`,
          "22-to-25": `${name}-kc-22-to-25.jar`
        }
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    },
    build: {
      /**
       * Change default 500kB to 1000kB.
       * This is very common for React and Keycloak projects since some mandatory
       * libraries naturally exceed 500kB before gzip minification.
       */
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          /**
           * Split node_modules into smaller chunks to reduce the size of each chunk.
           */
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("keycloakify")) {
                return "keycloakify";
              }
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-core";
              }
              if (id.includes("zod") || id.includes("react-hook-form") || id.includes("@hookform")) {
                return "forms";
              }
              return "vendor";
            }
          }
        }
      }
    }
  };
});
