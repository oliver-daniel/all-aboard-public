import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  ...(process.env.EXPORT && {
    output: "export",
  }),
};
// });

const plugins = [[BuilderDevTools, undefined]];

export default plugins.reduce(
  (config, [plugin, args]) => plugin(args)(config),
  nextConfig
);
