import type { Builder, BuilderContent } from "@builder.io/sdk";

export type LayoutModels = {
  header?: BuilderContent;
  footer?: BuilderContent;
  _404?: BuilderContent;
};

export const fetchLayoutModels = async (builder: Builder) => {
  return {
    header: await builder
      .get("navbar-navigation-links", {
        query: {
          id: "cc0bc1f22f8b425fb6b68146434dc231",
        },
      })
      .toPromise(),
    footer: await builder
      .get("symbol", {
        query: {
          id: "1d4812c904d741c297a00acc5e747e51",
        },
      })
      .toPromise(),
    _404: await builder.get("symbol", {
      query: {
        id: "716473294b3b4fc993d3e31a2ae1bdc0",
      },
    }),
  } as LayoutModels;
};
