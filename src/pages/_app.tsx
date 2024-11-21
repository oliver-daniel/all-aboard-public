import "@/styles/_index.scss";
import type { AppProps } from "next/app";
import React from "react";
import reportAccessibility from "@/lib/a11y";
import { getDefaultLayout } from "@/layout";
import { NextPage } from "next";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement, props: P) => React.ReactNode;
  layoutProps?: P;
};

export default function App({ Component, pageProps }: AppProps & {Component: NextPageWithLayout}) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  const layoutOptions = pageProps.layoutProps ?? Component.layoutProps ?? {};
 
  return getLayout(<Component {...pageProps} />, layoutOptions);
}

reportAccessibility(React);
