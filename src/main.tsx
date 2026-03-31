import { StrictMode } from "react";

import { KcPage } from "@/kc.gen";

import { createRoot } from "react-dom/client";

import "@/styles/fonts.css";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {!window.kcContext ? (
      <h1>No Keycloak Context</h1>
    ) : (
      <main className="font-sans text-green-900 antialiased">
        <KcPage kcContext={window.kcContext} />
      </main>
    )}
  </StrictMode>
);
