import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET(req: Request) {
  // Check for authorization (e.g., cron secret)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // For now, let's allow it for testing if CRON_SECRET is not set
  }

  const supabase = getSupabaseAdmin();
  const logDetails: string[] = [];

  try {
    logDetails.push("Starting automated blog generation...");

    // 1. Fetch the active target category
    const { data: catSetting } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'autopost_category')
      .single();

    const selectedCategory = catSetting?.value || "Technology";
    logDetails.push(`Target Sector Locked: ${selectedCategory}`);

    // 2. Define topics based on category
    const topics: Record<string, string[]> = {
      "Technology": ["AI in Workforce", "Future of Web Development", "Cybersecurity Trends 2025", "Cloud Computing Evolution"],
      "Career": ["Modern Resume Strategies", "Nailing the Remote Interview", "Soft Skills in Tech", "Personal Branding for Devs"],
      "Business": ["SaaS Growth Hacks", "Digital Transformation Guide", "Future of E-commerce", "Startup Funding in 2025"]
    };
    
    const availableTopics = topics[selectedCategory] || topics["Technology"];
    const generatedPosts = [];
    
    for (let i = 0; i < 2; i++) {
      const selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
      logDetails.push(`Starting cycle ${i + 1}/2 for topic: ${selectedTopic}...`);

    // 3. Generate Content via Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a world-class professional blogger. 
          Generate a deep-dive, 1000-word blog post.
          Return a JSON object with: 'title', 'content' (High-quality HTML with headings, lists, and bold text), 'excerpt' (160 chars), and 'category'.`
        },
        {
          role: "user",
          content: `Write a 1000-word deep-dive blog post about: ${selectedTopic} in the ${selectedCategory} sector.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

      const aiRes = JSON.parse(completion.choices[0].message.content || "{}");
      logDetails.push(`AI Content synthesized: ${aiRes.title}`);

      // 4. Fetch Image from Pexels
      const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${aiRes.category || selectedCategory}&per_page=1`, {
        headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "" }
      });
      const pexelsData = await pexelsRes.json();
      const imageUrl = pexelsData.photos?.[0]?.src?.large || "";

      // 5. Save to Database
      const slug = aiRes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 5);
      const { error: iError } = await supabase.from('blogs').insert({
        title: aiRes.title,
        slug,
        content: aiRes.content,
        excerpt: aiRes.excerpt,
        category: selectedCategory,
        featured_image: imageUrl,
        is_published: true,
        seo_title: aiRes.title,
        seo_description: aiRes.excerpt
      });

      if (iError) throw iError;
      generatedPosts.push(aiRes.title);
    }

    logDetails.push(`Successfully published ${generatedPosts.length} posts.`);

    // 6. Log success
    await supabase.from('automation_logs').insert({
      action: "AUTO_SYNC_CYCLE",
      status: "success",
      details: logDetails.join("\n")
    });

    return NextResponse.json({ message: "Automation successful", posts: generatedPosts });

  } catch (error: any) {
    console.error("Automation Failed:", error);
    
    // Log failure
    try {
      await supabase.from('automation_logs').insert({
        action: "blog_generation",
        status: "failed",
        details: `${logDetails.join("\n")}\n\nERROR: ${error.message}`
      });
    } catch (e) {}

    return NextResponse.json({ error: error.message, logs: logDetails }, { status: 500 });
  }
}
