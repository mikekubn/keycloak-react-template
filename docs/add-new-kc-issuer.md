# Adding a New Keycloak Issuer

This document describes the process of adding a new Keycloak issuer to the project and setting it up for deployment in TeamCity.

## 1. Local Configuration

### Update Environment Variables

To begin, set your new Keycloak issuer in the `.env` file as the `VITE_KEYCLOAK_ARTIFACT_ID`.

```env
# .env
VITE_KEYCLOAK_ARTIFACT_ID="your_new_issuer"
```

### Update Enum in `utils/load-env-values.ts`

The application validates the `VITE_KEYCLOAK_ARTIFACT_ID` to ensure it is a known issuer. You must add the new issuer's name to the string enum array in `utils/load-env-values.ts`.

```typescript
// utils/load-env-values.ts
// ...
  // Define schema to accept only enums values
  const schema = z.enum(["my-issuer", "your_new_issuer"]);
// ...
```

## 2. Update the Application Switcher

The entry point determining which issuer interface loads is `src/login/pages/issuer.tsx`. It acts as a switcher that renders the correct component based on the active `artifactId` (which corresponds to your `VITE_KEYCLOAK_ARTIFACT_ID`).

You need to describe and add your new issuer component to the `switch` statement:

```tsx
// src/login/pages/issuer.tsx
import { getArtifactId } from "@/utils/artifact-id";

import { KeycloakReactTemplateIssuer } from "./issuers";
import { YourNewIssuer } from "./issuers"; // 1. Import your new component

const Issuer = () => {
  const artifactId = getArtifactId();

  return (
    <>
      {(() => {
        switch (artifactId) {
          case "my-issuer":
            return <KeycloakReactTemplateIssuer />;
          case "your_new_issuer":
            return <YourNewIssuer />; // 2. Add the specific case for your new issuer
          default:
            throw new Error(`Unknown artifactId: ${artifactId}`);
        }
      })()}
    </>
  );
};

export { Issuer };
```