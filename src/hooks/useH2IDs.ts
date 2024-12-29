import slugify from "@/util/slugify";
import { type BuilderContent } from "@builder.io/sdk";
import { useEffect } from "react";

export const useH2IDs = (page?: BuilderContent) =>
  useEffect(() => {
    if (typeof document === "undefined" || !page) return;

    document.querySelectorAll("h2").forEach(
      (h2) => {
        if (h2.getAttribute("id")) return;

        const id = slugify(h2.textContent!);

        h2.setAttribute("id", id);
      },
      [page]
    );
  });
