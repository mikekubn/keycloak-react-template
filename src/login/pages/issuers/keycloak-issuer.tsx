import { Suspense } from "react";

import { useKeycloakify } from "@/providers";

const KeycloakReactTemplateIssuer = () => {
  const { pageId } = useKeycloakify();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>KeycloakReactTemplateIssuer {pageId}</div>
    </Suspense>
  );
};

export { KeycloakReactTemplateIssuer };
