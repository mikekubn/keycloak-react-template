import { getArtifactId } from "@/utils/artifact-id";

import { KeycloakReactTemplateIssuer } from "./issuers";

const Issuer = () => {
  const artifactId = getArtifactId();

  return (
    <>
      {(() => {
        switch (artifactId) {
          case "my-issuer":
            return <KeycloakReactTemplateIssuer />;
          default:
            throw new Error(`Unknown artifactId: ${artifactId}`);
        }
      })()}
    </>
  );
};

export { Issuer };
