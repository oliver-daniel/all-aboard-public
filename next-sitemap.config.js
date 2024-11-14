/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL || "https://allaboardim.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: "out",
};
