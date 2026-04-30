import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://xeloria.vercel.app";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: blogs } = await supabase
      .from("blogs")
      .select("slug, updated_at, created_at")
      .eq("is_published", true);

    if (blogs) {
      blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error("Sitemap: Failed to fetch blogs", e);
  }

  // Dynamic portfolio routes
  let portfolioRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: resumes } = await supabase
      .from("resumes")
      .select("content, updated_at");

    if (resumes) {
      portfolioRoutes = resumes
        .map((r) => {
          const fullName = (r.content as any)?.personalInfo?.fullName;
          if (!fullName) return null;
          const slug = fullName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          return {
            url: `${baseUrl}/p/@${slug}`,
            lastModified: new Date(r.updated_at || new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          };
        })
        .filter(Boolean) as MetadataRoute.Sitemap;
    }
  } catch (e) {
    console.error("Sitemap: Failed to fetch portfolios", e);
  }

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes];
}
