import "@/styles/_index.scss";
import type { AppProps } from "next/app";
import React from "react";
import reportAccessibility from "@/lib/a11y";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

reportAccessibility(React);
