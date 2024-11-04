import { useEffect } from "react";

export const useExternalTooltip = () =>
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.querySelectorAll("a").forEach((a) => {
      if (a.getAttribute("data-tooltip")) return;
      const isExternal =
        a.getAttribute("target") === "_blank" ||
        new URL(a.href).origin !== window.origin;

      if (isExternal) {
        a.setAttribute("data-tooltip", "Opens in a new tab.");
      }
    });
  }, []);
