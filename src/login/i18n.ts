import type { ThemeName } from "@/kc.gen";

import cs from "@/i18n/cs/messages";
import en from "@/i18n/en/messages";

import { i18nBuilder } from "keycloakify/login";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: en,
    cs: cs
  })
  .build();

type I18n = typeof ofTypeI18n;

export { type I18n, useI18n };
