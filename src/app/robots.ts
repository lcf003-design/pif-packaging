import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pifpackaging.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/portal", "/api", "/_next"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
