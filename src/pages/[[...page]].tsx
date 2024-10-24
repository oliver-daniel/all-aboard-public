import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";

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

  const header = await builder
    .get("navbar-navigation-links", {
      query: {
        id: "cc0bc1f22f8b425fb6b68146434dc231",
      },
    })
    .toPromise();

  const footer = await builder
    .get("symbol", {
      query: {
        id: "1d4812c904d741c297a00acc5e747e51",
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page ?? null,
      header: header ?? null,
      footer: footer ?? null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
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
  header?: BuilderContent;
  footer?: BuilderContent;
};

// Define the Page component
export default function Page({ page, header, footer }: Props) {
  const isPreviewing = useIsPreviewing();

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
        <title>{page?.data?.title}</title>
      </Head>
      <SkipToContent />
      <Header sections={header?.data?.value} />
      <main id="content">
        <BuilderComponent model="page" content={page || undefined} />
      </main>
      <Footer>
        <BuilderComponent model="symbol" content={footer} />
      </Footer>
    </>
  );
}
