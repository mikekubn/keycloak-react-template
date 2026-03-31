import type { I18n } from "@/login/i18n";

import { createContext, useContext } from "react";

const TranslationContext = createContext<I18n | null>(null);

const useTranslation = (): I18n => {
  const t = useContext(TranslationContext);

  if (!t) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return t;
};

export { TranslationContext, useTranslation };
