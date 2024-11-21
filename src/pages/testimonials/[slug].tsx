import { fetchLayoutModels } from "@/util/layout-models";
import { builder } from "@builder.io/sdk";
import { GetStaticProps } from "next";

import Page from "../[[...page]]";

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

  const layoutProps = await fetchLayoutModels(builder);

  return {
    props: {
      page: testimonial ?? null,
      layoutProps,
    },
    // Revalidate the content every 5 seconds
    ...(!process.env.EXPORT && { revalidate: 5 }),
  };
};

export default Page;
