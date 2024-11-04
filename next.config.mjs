import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  ...(process.env.EXPORT && {
    output: "export",
  }),
});

export default nextConfig;
