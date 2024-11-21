import { fetchLayoutModels, LayoutModels } from "@/util/layout-models";
import { BuilderComponent, Builder } from "@builder.io/react";
import { builder, BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import DefaultErrorPage from "next/error";

import Head from "next/head";

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
      layoutProps: { header: header ?? null, footer: footer ?? null },
    },
    // Revalidate the content every 5 seconds
    ...(!process.env.EXPORT && { revalidate: 5 }),
  };
};

type Props = {
  testimonial?: BuilderContent;
  layoutProps?: LayoutModels;
};

export default function TestimonialPage({ testimonial }: Props) {
  if (!testimonial && !Builder.isEditing && !Builder.isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{testimonial?.data?.title}</title>
      </Head>
      <main id="content" className="container">
        <BuilderComponent model="testimonial" content={testimonial} />
      </main>
    </>
  );
}
