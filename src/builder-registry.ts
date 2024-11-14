import {
  builder,
  Builder,
  BuilderElement,
  withChildren,
} from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const defaultTextChild: BuilderElement = {
  "@type": "@builder.io/sdk:Element",
  component: {
    name: "Text",
    options: {
      text: "Enter some text...",
    },
  },
};

Builder.registerComponent(
  withChildren(dynamic(async () => (await import("./components/Alert")).Alert)),
  {
    name: "Alert",
    defaultChildren: [defaultTextChild],
  }
);

Builder.registerComponent(
  withChildren(
    dynamic(async () => (await import("./components/Testimonial")).Testimonial)
  ),
  {
    name: "Testimonial",
    inputs: [{ name: "link", type: "text" }],
    defaultChildren: [defaultTextChild],
    noWrap: true,
  }
);

Builder.registerComponent(
  withChildren(
    dynamic(async () => (await import("./components/Carousel")).Carousel)
  ),
  {
    name: "Carousel",
  }
);

Builder.registerComponent(
  withChildren(
    dynamic(async () => (await import("./components/QuickLinks")).QuickLinks, {
      ssr: false,
    })
  ),
  {
    name: "QuickLinks",
    noWrap: true,
    inputs: [
      {
        name: "selector",
        type: "string",
        hideFromUI: true,
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: {
            text: "<h4>Quick Links</h4>",
          },
        },
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(async () => (await import("./components/ResourceCard")).ResourceCard),
  {
    name: "ResourceCard",
    inputs: [
      // {
      //   name: "items",
      //   type: "object",
      //   hideFromUI: true,
      //   meta: {
      //     ts: "LinkItem[]",
      //   },
      //   required: true,
      // },
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "items",
        type: "list",
        required: true,
        defaultValue: [],
        subFields: [
          {
            name: "href",
            type: "url",
          },
          {
            name: "label",
            type: "string",
          },
          {
            name: "description",
            type: "richText",
          },
        ],
      },
    ],
  }
);
