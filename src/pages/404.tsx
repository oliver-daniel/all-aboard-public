import { fetchLayoutModels } from "@/util/layout-models";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import Head from "next/head";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = {
  _404?: BuilderContent;
};

export async function getStaticProps() {
  const _404 = await builder
    .get("symbol", {
      query: {
        id: "716473294b3b4fc993d3e31a2ae1bdc0",
      },
    })
    .toPromise();

  const layoutProps = await fetchLayoutModels(builder);

  return {
    props: { _404, layoutProps },
    // Revalidate the content every 5 seconds
    ...(!process.env.EXPORT && { revalidate: 5 }),
  };
}

export const _404Page = ({ _404 }: Props) => (
  <>
    <Head>
      <title>Page not found | All Aboard Integrative Medicine</title>
    </Head>
    <main id="content" className="container">
      <BuilderComponent model="symbol" content={_404} />
    </main>
  </>
);

export default function NotFound({ _404 }: Props) {
  if (Builder.isPreviewing || Builder.isEditing) {
    return <BuilderComponent model="page" />;
  }

  return <_404Page _404={_404} />;
}
