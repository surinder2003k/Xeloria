import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/sign-in",
          "/sign-up",
          "/_next/",
        ],
      },
      {
        // Block AI scrapers from harvesting user content
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: "https://summitcv.io/sitemap.xml",
    host: "https://summitcv.io",
  };
}
