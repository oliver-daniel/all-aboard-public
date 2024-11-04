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
