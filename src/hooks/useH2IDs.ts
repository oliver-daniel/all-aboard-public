import slugify from "@/util/slugify";
import { useEffect } from "react";

export const useH2IDs = () =>
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.querySelectorAll("h2").forEach((h2) => {
      if (h2.getAttribute("id")) return;

      const id = slugify(h2.textContent!);

      h2.setAttribute("id", id);
    });
  });
