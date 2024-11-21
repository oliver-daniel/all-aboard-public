import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAnalytics } from "@/lib/ga4";
import { LayoutModels } from "@/util/layout-models";
import { BuilderComponent } from "@builder.io/react";
import dynamic from "next/dynamic";

const SkipToContent = dynamic(
  async () => (await import("@/components/SkipToContent")).SkipToContent,
  {
    ssr: false,
  }
);

export const getDefaultLayout = (
  page: React.ReactElement,
  { header, footer }: LayoutModels
) => {
  return (
    <>
      <SkipToContent />
      <Header sections={header?.data?.value} />
      {page}
      <Footer>
        <BuilderComponent model="symbol" content={footer} />
      </Footer>
      {process.env.NODE_ENV !== "development" && (
        <GoogleAnalytics gtmId={process.env.NEXT_PUBLIC_GA4_ID!} />
      )}
    </>
  );
};
