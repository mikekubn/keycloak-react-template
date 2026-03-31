import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { I18n } from "@/login/i18n";
import type { KcContext } from "@/login/KcContext";

type KcContextType<T> = Extract<KcContext, { pageId: T }>;

type CustomTemplateProps<T> = Omit<
  TemplateProps<KcContextType<T>, I18n>,
  "doUseDefaultCss" | "headerNode" | "kcContext" | "i18n"
>;

type KcContextProps<T> = {
  kcContext: KcContextType<T>;
};

export type { CustomTemplateProps, KcContextProps, KcContextType };
