import { useEffect } from "react";

export const useExternalTooltip = () =>
  useEffect(() => {
    if (typeof document === "undefined") return;

    // "clever" hack to add tooltips to everything but those in the header menu.
    document.querySelectorAll("a:is(:not(header a))" as "a").forEach((a) => {
      if (a.getAttribute("data-tooltip")) return;
      const isExternal =
        a.getAttribute("target") === "_blank" ||
        new URL(a.href).origin !== window.origin;

      if (isExternal) {
        a.setAttribute("data-tooltip", "Opens in a new tab.");
      }
    });
  }, []);
