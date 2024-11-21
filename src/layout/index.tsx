import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAnalytics } from "@/lib/ga4";
import { LayoutModels } from "@/util/layout-models";
import { BuilderComponent, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const SkipToContent = dynamic(
  async () => (await import("@/components/SkipToContent")).SkipToContent,
  {
    ssr: false,
  }
);

export const getDefaultLayout = (
  page: React.ReactElement,
  { header, footer, _404 }: LayoutModels
) => {
  //   const { page: _page } = page.props;

  // If the page content is not available
  // and not in preview mode, show a 404 error page

  const content = page ? (
    page
  ) : Builder.isEditing || Builder.isPreviewing ? (
    <main id="content" className="container">
      <BuilderComponent model="page" />
    </main>
  ) : (
    <>
      <Head>
        <title>Page not found | All Aboard Integrative Medicine</title>
      </Head>
      <main id="content" className="container">
        <BuilderComponent model="symbol" content={_404} />
      </main>
    </>
  );

  return (
    <>
      <SkipToContent />
      <Header sections={header?.data?.value} />
      {content}
      <Footer>
        <BuilderComponent model="symbol" content={footer} />
      </Footer>
      {process.env.NODE_ENV !== "development" && (
        <GoogleAnalytics gtmId={process.env.NEXT_PUBLIC_GA4_ID!} />
      )}
    </>
  );
};
