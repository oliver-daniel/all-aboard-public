import { useEffect } from "react";
import crypto from "crypto";

export type GlossaryItem = {
  value: string;
  definition: React.ReactNode;
};

export type GlossaryRepr = {
  element: Element;
  defn: GlossaryItem;
  hash: string;
};

const hashed = (value: crypto.BinaryLike) =>
  crypto.createHash("md5").update(value).digest("hex");

export const usePopover = (
  data: GlossaryItem[],
  dispatch: React.Dispatch<React.SetStateAction<GlossaryRepr[]>>
) =>
  useEffect(() => {
    if (typeof document === "undefined" || !data) return;

    const foundOnPage: GlossaryRepr[] = [];

    document.querySelectorAll("[popovertarget]").forEach((element) => {
      const defn = data.find((item) => item.value === element.textContent);
      if (defn) {
        const hash = `defn-${hashed(JSON.stringify(defn))}`;
        foundOnPage.push({ element, defn, hash });
        element.setAttribute("popovertarget", hash);
      }
    });

    dispatch(foundOnPage);
  }, [data, dispatch]);
