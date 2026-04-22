import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  if (!apiKey) {
    console.error("Pexels API key missing");
    return NextResponse.json({ error: "API configuration error" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: "Pexels API error", details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Pexels fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
