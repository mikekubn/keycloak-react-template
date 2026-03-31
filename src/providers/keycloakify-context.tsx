import type { KcContext } from "@/login/KcContext";
import type { KcContextProps } from "@/login/type";

import { createContext, useContext } from "react";

const KeycloakifyContext = createContext<KcContextProps<KcContext["pageId"]> | null>(null);

const useKeycloakify = <T extends KcContext["pageId"] = KcContext["pageId"]>(): KcContextProps<T>["kcContext"] => {
  const keycloakify = useContext(KeycloakifyContext) as unknown as KcContextProps<T>;

  if (!keycloakify?.kcContext) {
    throw new Error("useKeycloakify must be used within a KeycloakifyProvider");
  }

  return keycloakify.kcContext;
};

export { KeycloakifyContext, useKeycloakify };
