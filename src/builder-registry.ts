import { builder, Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  withChildren(dynamic(async () => (await import("./components/Alert")).Alert)),
  {
    name: "Alert",
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
        },
      },
    ],
  }
);
