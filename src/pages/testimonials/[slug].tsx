import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fetchLayoutModels, LayoutModels } from "@/util/layout-models";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder, BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DefaultErrorPage from "next/error";
import Head from "next/head";

const SkipToContent = dynamic(
  async () => (await import("@/components/SkipToContent")).SkipToContent,
  {
    ssr: false,
  }
);

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function getStaticPaths() {
  const testimonials = await builder.getAll("testimonial", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: testimonials.map((page) => String(page.data?.url)),
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const testimonial = await builder
    .get("testimonial", {
      query: {
        "data.url": "/testimonials/" + (params?.slug ?? ""),
      },
    })
    .toPromise();

  const { header, footer } = await fetchLayoutModels(builder);

  return {
    props: {
      testimonial: testimonial ?? null,
      header: header ?? null,
      footer: footer ?? null,
    },
    // Revalidate the content every 5 seconds
    ...(!process.env.EXPORT && { revalidate: 5 }),
  };
};

type Props = {
  testimonial?: BuilderContent;
} & LayoutModels;

export default function TestimonialPage({
  testimonial,
  header,
  footer,
}: Props) {
  const isPreviewing = useIsPreviewing();

  if (!testimonial && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{testimonial?.data?.title}</title>
      </Head>
      <SkipToContent />
      <Header sections={header?.data?.value} />
      <main id="content" className="container">
        <BuilderComponent model="testimonial" content={testimonial} />
      </main>
      <Footer>
        <BuilderComponent model="symbol" content={footer} />
      </Footer>
    </>
  );
}
