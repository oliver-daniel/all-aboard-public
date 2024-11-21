import { useEffect } from "react";
import crypto from "crypto";

export type GlossaryItem = {
  value: string;
  definition: string;
};

export type GlossaryRepr = {
  element: Element;
  defn: GlossaryItem;
  hash: string;
};

const hashed = (value: crypto.BinaryLike) =>
  crypto.createHash("md5").update(value).digest("hex");

export const usePopover = (
  data?: GlossaryItem[],
  dispatch?: React.Dispatch<React.SetStateAction<GlossaryRepr[]>>
) =>
  useEffect(() => {
    if (typeof document === "undefined" || !data?.length || !dispatch) return;

    const foundOnPage: GlossaryRepr[] = [];

    document.querySelectorAll("[popovertarget]").forEach((element) => {
      if (element.getAttribute("popovertarget")?.startsWith("defn")) {
        return;
      }
      const defn = data.find((item) =>
        [
          element.getAttribute("popovertarget") || "",
          element.textContent || "",
        ].some(
          (attr) =>
            item.value.localeCompare(attr, undefined, {
              sensitivity: "accent",
            }) === 0
        )
      );
      if (defn) {
        const hash = `defn-${hashed(JSON.stringify(defn))}`;
        foundOnPage.push({ element, defn, hash });
        element.setAttribute("popovertarget", hash);
      }
      dispatch(foundOnPage);
    });
  }, [data, dispatch]);
