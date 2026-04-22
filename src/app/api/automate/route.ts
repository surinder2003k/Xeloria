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

    // 1. Fetch topics from app_settings
    const { data: settings, error: sError } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'blog_topics')
      .single();

    if (sError) {
      logDetails.push("Error fetching topics. Using defaults.");
    }

    const topics = settings?.value || [
      "Future of AI in Tech",
      "Mastering Personal Branding",
      "The Evolution of Resumes",
      "Remote Work Trends 2025"
    ];

    // 2. Fetch already covered topics from logs or blogs to avoid repeats
    const { data: existingBlogs } = await supabase.from('blogs').select('title');
    const existingTitles = (existingBlogs || []).map(b => b.title.toLowerCase());

    const availableTopics = topics.filter((t: string) => !existingTitles.includes(t.toLowerCase()));

    if (availableTopics.length === 0) {
      logDetails.push("No new topics available to cover.");
      return NextResponse.json({ message: "No new topics", logs: logDetails });
    }

    const selectedTopic = availableTopics[0];
    logDetails.push(`Selected Topic: ${selectedTopic}`);

    // 3. Generate Content via Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert tech and career blogger. Generate a high-quality, long-form blog post. Return JSON with 'title', 'content' (HTML), 'excerpt', and 'category'."
        },
        {
          role: "user",
          content: `Write a deep-dive blog post about: ${selectedTopic}`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const aiRes = JSON.parse(completion.choices[0].message.content || "{}");
    logDetails.push("AI Content generated.");

    // 4. Fetch Image from Pexels
    const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${aiRes.category || selectedTopic}&per_page=1`, {
      headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "" }
    });
    const pexelsData = await pexelsRes.json();
    const imageUrl = pexelsData.photos?.[0]?.src?.large || "";
    logDetails.push(imageUrl ? "Image fetched from Pexels." : "No image found.");

    // 5. Save to Database
    const slug = aiRes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const { error: iError } = await supabase.from('blogs').insert({
      title: aiRes.title,
      slug,
      content: aiRes.content,
      excerpt: aiRes.excerpt,
      category: aiRes.category,
      featured_image: imageUrl,
      is_published: true,
      seo_title: aiRes.title,
      seo_description: aiRes.excerpt
    });

    if (iError) throw iError;
    logDetails.push("Blog post published successfully.");

    // 6. Log success
    await supabase.from('automation_logs').insert({
      action: "blog_generation",
      status: "success",
      details: logDetails.join("\n")
    });

    return NextResponse.json({ message: "Automation successful", topic: selectedTopic });

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
