import { z } from "zod/v4";

const extractEnvVariableKeycloakArtifactId = (variableName: string, variable: string | undefined) => {
  if (!variable) {
    throw new Error(`Environment variable ${variableName} is not set`);
  }

  // Define schema to accept only enums values
  const schema = z.enum(["my-issuer"]);

  const parsed = schema.safeParse(variable);

  if (!parsed.success) {
    throw new Error(`Environment variable ${variableName} must be one of the following enum values`);
  }

  return parsed.data;
};

export { extractEnvVariableKeycloakArtifactId };
