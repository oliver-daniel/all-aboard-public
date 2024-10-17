const isExternal = (url: string) => url.includes("//");

export const linkProps: (url: string) => object = (url) =>
  isExternal(url)
    ? {
        target: "_blank",
        rel: "noopener",
        title: "Opens in new tab.",
      }
    : {};
