# Development Guide

This document covers the primary ways to develop and test within this repository.

## 1. Setting the Issuer

Before developing locally, you must specify which Keycloak issuer you are targeting. Configure this by setting the `VITE_KEYCLOAK_ARTIFACT_ID` property in your `.env` file.

```env
# Example
VITE_KEYCLOAK_ARTIFACT_ID=my-issuer
```

---

## 2. Using Storybook (Recommended for UI Development)

Storybook provides a sandbox to build and test UI components and Keycloak login page templates in isolation.

To start the Storybook environment, run:

```bash
pnpm storybook
```

---

## 3. Local Development with `pnpm dev`

You can test the actual application build locally using `pnpm dev`. 

### Mocking the Keycloak Context

Because the Keycloak context (`kcContext`) is not natively available when running locally outside of Keycloak, you will need to add a mock configuration to test specific pages (like the login screen).

To do this, update `src/main.tsx` inside the index entry file to inject the context mock during development mode only:

```tsx
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: "login.ftl",
    overrides: {
      realm: {
        internationalizationEnabled: true
      },
      locale: {
        currentLanguageTag: "cs"
      }
    }
  });
}
```

> **Warning:** Make sure this is wrapped inside the `if (import.meta.env.DEV)` check so that the mocked context is not bundled into the final production `/dist` artifact, which could increase bundle size and cause errors inside the actual Keycloak environment.