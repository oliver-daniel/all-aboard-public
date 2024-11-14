import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";
import { useAbbrs } from "@/hooks/useAbbrs";
import { GlossaryItem, GlossaryRepr, usePopover } from "@/hooks/usePopover";
import { useMemo, useState } from "react";
import { PopoverContainer } from "@/components/Popover";
import { useExternalTooltip } from "@/hooks/useExternalTooltip";
import { fetchLayoutModels, LayoutModels } from "@/util/layout-models";
import { useH2IDs } from "@/hooks/useH2IDs";

const SkipToContent = dynamic(
  async () => (await import("@/components/SkipToContent")).SkipToContent,
  {
    ssr: false,
  }
);

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
      },
      ...(process.env.NODE_ENV === "development" && {
        cachebust: true,
      }),
    })
    .toPromise();

  const { header, footer } = await fetchLayoutModels(builder);

  const abbrs = await builder
    .get("abbreviation", {
      query: {
        id: "07b71fb41e6948cdb50a7ed629250871",
      },
    })
    .toPromise();

  const glossary = await builder.getAll("glossary-definitions");

  // Return the page content as props
  return {
    props: {
      page: page ?? null,
      header: header ?? null,
      footer: footer ?? null,
      abbrs: abbrs ?? null,
      glossary: glossary ?? null,
    },
    // Revalidate the content every 5 seconds
    ...(!process.env.EXPORT && { revalidate: 5 }),
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });

  // Generate the static paths for all pages in Builder
  return {
    paths: pages.map((page) => String(page.data?.url)),
    fallback: "blocking",
  };
}

type Props = {
  page?: BuilderContent;
  abbrs?: BuilderContent;
  glossary?: BuilderContent[];
} & LayoutModels;

// Define the Page component
export default function Page({ page, header, footer, abbrs, glossary }: Props) {
  const isPreviewing = useIsPreviewing();
  const [glossaryReprs, setGlossaryReprs] = useState<GlossaryRepr[]>([]);

  const definitions = abbrs?.data?.value;

  const glossaryItems = useMemo(
    () => glossary?.map((res) => res.data) as GlossaryItem[],
    [glossary]
  );

  // TODO:
  // these work on init load or reload, but
  // NOT on page transition.
  useAbbrs(definitions);
  usePopover(glossaryItems, setGlossaryReprs);
  useExternalTooltip();
  useH2IDs();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{`${page?.data?.title} | All Aboard Integrative Medicine`}</title>
      </Head>
      <SkipToContent />
      <Header sections={header?.data?.value} />
      <main id="content" className="container">
        <BuilderComponent model="page" content={page || undefined} />
      </main>
      <PopoverContainer items={glossaryReprs} />
      <Footer>
        <BuilderComponent model="symbol" content={footer} />
      </Footer>
    </>
  );
}
