import { useEffect } from "react";

export const useAbbrs = (data: { [key in string]: string }) =>
  useEffect(() => {
    if (typeof document === "undefined" || !data) return;

    document.querySelectorAll("abbr").forEach((element) => {
      element.title = data[element.textContent || ""];
    });
  }, [data]);
