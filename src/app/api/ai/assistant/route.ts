import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import * as cheerio from "cheerio";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

async function fetchAndParseURL(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return "";
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Remove scripts, styles, etc.
    $('script, style, noscript, iframe, img, svg, nav, footer').remove();
    
    // Get text, replace multiple spaces/newlines with single space
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Return first 8000 chars to avoid token limits
    return text.substring(0, 8000);
  } catch (error) {
    console.error("Failed to fetch URL:", url, error);
    return "";
  }
}

const SYSTEM_PROMPT = `You are Xeloria AI, a highly advanced portfolio architect assistant.
Your goal is to help users build their portfolios by answering questions and automatically filling out their resume information with 100% precision and exhaustivity.

CONTEXT:
The user is currently in the Portfolio Builder. You can see their current resume data and help them update it.

CAPABILITIES:
1. Answer general questions about portfolio building, career advice, and technical skills.
2. Generate structured data to update the portfolio.
3. Auto-fill data from Links: If the user provides a link/URL (like a public profile, LinkedIn, or personal site), the system will provide the webpage text. You MUST read this text, extract EVERY relevant detail (Experience, Projects, Skills, Education, Personal Info), and execute the corresponding actions.

STRATEGY FOR DATA FILLING:
- BE EXHAUSTIVE: If a webpage contains multiple jobs, add ALL of them using multiple 'addExperience' actions.
- UPDATE EXISTING: If the user already has data (see CURRENT DATA below), do NOT be afraid to update it if the new information is more complete or accurate. Use 'updatePersonalInfo' to overwrite placeholders.
- DEDUPLICATION: If you are adding an experience or project that ALREADY exists in the CURRENT DATA (same company and title, or same project name), use your judgment to either skip it or update it if the description is better.
- SMART MAPPING: Map the extracted info to the most appropriate fields. If a skill doesn't have a category, categorize it logically (e.g., "React" -> "Frontend").

RESPONSE FORMAT:
You must ALWAYS respond with a JSON object containing:
- "message": A friendly, helpful text response to the user.
- "actions": An array of action objects.

AVAILABLE ACTIONS:
- { "type": "updatePersonalInfo", "payload": { "fullName": "...", "email": "...", "phone": "...", "location": "...", "website": "...", "linkedin": "...", "jobTitle": "...", "github": "..." } }
- { "type": "updateSummary", "payload": "..." }
- { "type": "addExperience", "payload": { "company": "...", "position": "...", "startDate": "...", "endDate": "...", "description": "...", "current": boolean } }
- { "type": "addEducation", "payload": { "school": "...", "degree": "...", "startDate": "...", "endDate": "...", "description": "..." } }
- { "type": "addProject", "payload": { "name": "...", "description": "...", "link": "...", "technologies": ["...", "..."] } }
- { "type": "addSkill", "payload": { "category": "...", "items": ["...", "..."] } }
- { "type": "updateSkills", "payload": [{ "category": "...", "items": ["...", "..."] }] }

IMPORTANT:
- Use YYYY-MM for dates.
- If info is missing, leave it out of the payload, but try to find as much as possible.
- Be futuristic, concise, and professional.
- ALWAYS return a valid JSON object.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, currentData } = await req.json();

    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();
    let urlContext = "";

    if (lastUserMessage && lastUserMessage.content) {
      const urls = lastUserMessage.content.match(URL_REGEX);
      if (urls && urls.length > 0) {
        const urlText = await fetchAndParseURL(urls[0]);
        if (urlText) {
          urlContext = `\n\nThe user provided a link which contains the following webpage text. Please extract relevant resume data (Experience, Projects, Education, About, Skills, Name, Job Title) from it and use the available actions to auto-fill their portfolio:\n\n=== LINK WEBPAGE CONTENT START ===\n${urlText}\n=== LINK WEBPAGE CONTENT END ===\n`;
        }
      }
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT + `\n\nCURRENT DATA:\n${JSON.stringify(currentData)}` + urlContext },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ 
      message: "I encountered a synchronization error with the satellite node. Please try again.",
      error: error.message 
    }, { status: 500 });
  }
}
