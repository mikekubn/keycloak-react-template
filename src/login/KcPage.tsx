import type { KcContext } from "@/login/KcContext";

import { useI18n } from "@/login/i18n";
import { Issuer } from "@/login/pages";
import { KeycloakifyContext, TranslationContext } from "@/providers";

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <KeycloakifyContext.Provider value={{ kcContext }}>
      <TranslationContext.Provider value={i18n}>
        <Issuer />
      </TranslationContext.Provider>
    </KeycloakifyContext.Provider>
  );
}
