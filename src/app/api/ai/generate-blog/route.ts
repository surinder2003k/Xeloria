import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getPexelsImage(query: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
    if (!apiKey) return null;

    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.photos?.[0]?.src?.large || null;
  } catch (e) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { prompt, category } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a world-class professional blog writer and SEO expert. 
          Generate a deep-dive, high-quality blog post of approximately 1000 words.
          
          OUTPUT FORMAT:
          You MUST return a JSON object with:
          - 'title': A compelling, click-worthy title.
          - 'content': The full article formatted in clean, professional HTML (using <h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>). 
          - 'excerpt': A concise summary (max 160 chars).
          - 'category': One specific professional category.

          IMAGE PLACEMENT:
          IMPORTANT: You MUST include exactly three image placeholders in the HTML content using this exact format: [[IMAGE: descriptive search query]].
          Place them naturally: one after the introduction, one in the middle, and one before the conclusion.
          The search query should be specific enough to find a high-quality professional image on Pexels.

          TONE:
          Authoritative, engaging, and professional. Use data-driven insights and actionable advice.`
        },
        {
          role: "user",
          content: `Synthesize a comprehensive 1000-word blog post about: ${prompt} in the ${category || 'Technology'} sector.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");
    const blog = aiResponse.blog || aiResponse;

    // Resolve Image Placeholders
    let content = blog.content || "";
    const imageMatches = content.match(/\[\[IMAGE: (.*?)\]\]/g);
    
    if (imageMatches) {
      for (const match of imageMatches) {
        const query = match.replace('[[IMAGE: ', '').replace(']]', '');
        const imageUrl = await getPexelsImage(query);
        if (imageUrl) {
          const imageHtml = `
            <div class="my-12 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-video relative group">
              <img src="${imageUrl}" alt="${query}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              <div class="absolute bottom-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-[9px] font-black text-white/60 uppercase tracking-widest italic">
                Visual Context: ${query.toUpperCase()}
              </div>
            </div>
          `;
          content = content.replace(match, imageHtml);
        } else {
          content = content.replace(match, ""); 
        }
      }
    }

    blog.content = content;

    return NextResponse.json({ blog });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
