import { extractEnvVariableKeycloakArtifactId } from "./env/get-keycloak-artifact-id";

const getArtifactId = () => {
  const id = extractEnvVariableKeycloakArtifactId(
    "VITE_KEYCLOAK_ARTIFACT_ID",
    import.meta.env.VITE_KEYCLOAK_ARTIFACT_ID
  );

  return id;
};

export { getArtifactId };
