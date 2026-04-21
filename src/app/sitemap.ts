import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URLs
  const baseUrl = "https://summitcv.io";

  // Static routes
  const staticRoutes = [
    "",
    "/blog",
    "/sign-in",
    "/sign-up",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Mocked for now, usually fetched from Supabase)
  // Example for portfolios:
  // const { data: profiles } = await supabase.from('profiles').select('username, updated_at');
  // const portfolioRoutes = profiles?.map(p => ({ url: `${baseUrl}/p/@${p.username}`, ... }))

  // Example for blog posts:
  // const { data: blogs } = await supabase.from('blogs').select('slug, updated_at').eq('is_published', true);
  
  return [
    ...staticRoutes,
    // ...portfolioRoutes,
    // ...blogRoutes
  ];
}
