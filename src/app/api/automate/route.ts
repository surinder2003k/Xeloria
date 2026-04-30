import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import Groq from "groq-sdk";

// Allow up to 60 seconds for Vercel Pro / 10s for Hobby
export const maxDuration = 60;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET(req: Request) {
  // Enforce CRON_SECRET authorization — Vercel sends this automatically
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const logDetails: string[] = [];

  try {
    logDetails.push("Starting automated blog generation...");

    // 1. Fetch the active target category from settings
    const { data: catSetting } = await supabase
      .from("app_settings")
      .select("value")
      .eq("key", "autopost_category")
      .single();

    const selectedCategory = catSetting?.value || "Technology";
    logDetails.push(`Target Sector Locked: ${selectedCategory}`);

    // 2. Define a large pool of topics based on category
    const topics: Record<string, string[]> = {
      Technology: [
        "AI in the Modern Workforce",
        "Future of Web Development in 2025",
        "Cybersecurity Trends Shaping 2025",
        "Cloud Computing Evolution and Edge AI",
        "The Rise of No-Code Platforms",
        "Web3 and the Decentralized Web",
        "Machine Learning for Beginners",
        "How Generative AI is Changing Design",
      ],
      Career: [
        "Modern Resume Strategies That Get You Hired",
        "How to Nail the Remote Interview",
        "Soft Skills Every Tech Professional Needs",
        "Personal Branding for Developers",
        "How to Get Your First Tech Job in 2025",
        "Negotiating Your Salary Like a Pro",
        "Building a Portfolio That Stands Out",
        "LinkedIn Optimization Tips for Job Seekers",
      ],
      Business: [
        "SaaS Growth Hacks That Actually Work",
        "The Ultimate Digital Transformation Guide",
        "The Future of E-commerce in 2025",
        "How to Raise Your First Round of Funding",
        "Building a Remote Team from Scratch",
        "Marketing on a Shoestring Budget",
        "Startup Lessons from Silicon Valley",
        "How to Validate Your Business Idea Fast",
      ],
    };

    const availableTopics = topics[selectedCategory] || topics["Technology"];
    const generatedPosts: string[] = [];

    // Generate 2 posts sequentially
    for (let i = 0; i < 2; i++) {
      // Pick a random topic, avoiding duplicates in this cycle
      const remainingTopics = availableTopics.filter(
        (t) => !generatedPosts.includes(t)
      );
      const selectedTopic =
        remainingTopics[Math.floor(Math.random() * remainingTopics.length)] ||
        availableTopics[Math.floor(Math.random() * availableTopics.length)];

      logDetails.push(`Cycle ${i + 1}/2 — Generating: "${selectedTopic}"...`);

      try {
        // 3. Generate Content via Groq AI
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are a world-class professional blogger writing for a career and tech platform.
Generate a high-quality, 1000-word blog post.
Return ONLY a valid JSON object with these exact keys:
- "title": a compelling, SEO-friendly title (string)
- "content": the full blog post body as high-quality HTML (with <h2>, <h3>, <p>, <ul>, <li>, <strong> tags)
- "excerpt": a 150-160 character summary for SEO (string)
- "category": the topic category (string)`,
            },
            {
              role: "user",
              content: `Write a 1000-word professional blog post about: "${selectedTopic}" for the ${selectedCategory} category.`,
            },
          ],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" },
          temperature: 0.7,
        });

        const rawContent = completion.choices[0].message.content || "{}";
        const aiRes = JSON.parse(rawContent);

        if (!aiRes.title || !aiRes.content) {
          logDetails.push(`Cycle ${i + 1} — AI returned incomplete data, skipping.`);
          continue;
        }

        logDetails.push(`AI Content ready: "${aiRes.title}"`);

        // 4. Fetch a relevant image from Pexels
        let imageUrl = "";
        try {
          const pexelsQuery = encodeURIComponent(aiRes.category || selectedCategory);
          const pexelsRes = await fetch(
            `https://api.pexels.com/v1/search?query=${pexelsQuery}&per_page=5&orientation=landscape`,
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
              },
            }
          );
          const pexelsData = await pexelsRes.json();
          const photos = pexelsData.photos || [];
          // Pick a random photo from results to avoid duplicate images
          const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
          imageUrl = randomPhoto?.src?.large2x || randomPhoto?.src?.large || "";
        } catch (pexelsErr) {
          logDetails.push(`Cycle ${i + 1} — Pexels image fetch failed, continuing without image.`);
        }

        // 5. Generate a clean slug
        const slug =
          aiRes.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
            .substring(0, 60) +
          "-" +
          Math.random().toString(36).substring(2, 7);

        // 6. Save to Database
        const { error: insertError } = await supabase.from("blogs").insert({
          title: aiRes.title,
          slug,
          content: aiRes.content,
          excerpt: aiRes.excerpt?.substring(0, 160) || "",
          category: selectedCategory,
          featured_image: imageUrl,
          is_published: true,
          seo_title: aiRes.title,
          seo_description: aiRes.excerpt?.substring(0, 160) || "",
        });

        if (insertError) {
          logDetails.push(`Cycle ${i + 1} — DB insert failed: ${insertError.message}`);
          throw insertError;
        }

        generatedPosts.push(aiRes.title);
        logDetails.push(`Cycle ${i + 1} — Published: "${aiRes.title}"`);
      } catch (cycleError: any) {
        logDetails.push(`Cycle ${i + 1} — Error: ${cycleError.message}`);
        // Continue to next cycle instead of crashing the whole run
      }
    }

    logDetails.push(`Done. Successfully published ${generatedPosts.length}/2 posts.`);

    // 7. Log overall success
    await supabase.from("automation_logs").insert({
      action: "AUTO_BLOG_CYCLE",
      status: generatedPosts.length > 0 ? "success" : "partial_failure",
      details: logDetails.join("\n"),
    });

    return NextResponse.json({
      message: `Automation complete. Published ${generatedPosts.length} post(s).`,
      posts: generatedPosts,
      logs: logDetails,
    });
  } catch (error: any) {
    console.error("Automation Failed:", error);

    // Log failure
    try {
      await supabase.from("automation_logs").insert({
        action: "AUTO_BLOG_CYCLE",
        status: "failed",
        details: `${logDetails.join("\n")}\n\nFATAL ERROR: ${error.message}`,
      });
    } catch (_) {}

    return NextResponse.json(
      { error: error.message, logs: logDetails },
      { status: 500 }
    );
  }
}
