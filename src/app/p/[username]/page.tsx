import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PortfolioThemeFormal } from "@/components/portfolio/themes/FormalTheme";
import { PortfolioThemeCyberpunk } from "@/components/portfolio/themes/CyberpunkTheme";
import { PortfolioThemeGlass } from "@/components/portfolio/themes/GlassTheme";
import { PortfolioThemeMinimalV2 } from "@/components/portfolio/themes/MinimalV2Theme";
import { PortfolioThemeMagazine } from "@/components/portfolio/themes/MagazineTheme";
import { PortfolioThemeBrutalist } from "@/components/portfolio/themes/BrutalistTheme";
import { PortfolioThemeAura } from "@/components/portfolio/themes/AuraTheme";
import { PortfolioThemeNova } from "@/components/portfolio/themes/NovaTheme";
import { PortfolioThemeQuantum } from "@/components/portfolio/themes/QuantumTheme";
import { PortfolioThemeElysian } from "@/components/portfolio/themes/ElysianTheme";
import { PortfolioThemeTitan } from "@/components/portfolio/themes/TitanTheme";
import { PortfolioThemeModernNoir } from "@/components/portfolio/themes/ModernNoirTheme";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ theme?: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const cleanUsername = username.replace("@", "");
  
  return {
    title: `${cleanUsername} | Professional Portfolio`,
    description: `Check out ${cleanUsername}'s professional portfolio and experience.`,
  };
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const { username } = await params;
  const { theme: urlTheme } = await searchParams;
  
  // Normalize the incoming username (remove @ and handle encoded spaces)
  const cleanUsername = decodeURIComponent(username)
    .replace(/^@/, "") // Only remove leading @
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, ""); // Strict alphanumeric normalization

  // 1. Fetch resumes to find who owns this username
  // We match on a normalized version of the fullName stored in the JSON content
  const { data: resumes, error: resError } = await supabase
    .from('resumes')
    .select('user_id, content');

  if (resError || !resumes) {
    console.error("Fetch resumes error:", resError);
    return notFound();
  }

  // Find the matching user with robust normalization
  const matchingResume = resumes.find(r => {
    const fullName = (r.content as any)?.personalInfo?.fullName || "";
    const normalizedName = fullName.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    
    return normalizedName === cleanUsername;
  });

  if (!matchingResume) {
    console.warn(`No matching resume found for cleanUsername: "${cleanUsername}"`);
    return notFound();
  }

  const userId = matchingResume.user_id;
  const resumeData = matchingResume.content as unknown as ResumeData;

  // 2. Fetch portfolio content using the correct column 'content'
  const { data: portfolio, error: pError } = await supabase
    .from('portfolios')
    .select('content')
    .eq('user_id', userId)
    .maybeSingle();

  if (pError) console.error("Fetch portfolio error:", pError);
  
  const portfolioData = (portfolio?.content as unknown as PortfolioData) || {
    templateId: "formal",
    themeColor: "#4f46e5",
    isPublic: true,
    socialLinks: {},
    sectionsVisibility: {
      hero: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      blog: true,
      contact: true,
    },
  };

  // Determine which theme to render
  const selectedTemplate = urlTheme || portfolioData.templateId || "formal";
  console.log("==> Public page resolved selectedTemplate:", selectedTemplate, "for user:", cleanUsername, "userId:", userId);
  console.log("==> Raw portfolioData.templateId:", portfolioData.templateId, "urlTheme:", urlTheme);

  const renderTheme = () => {
    const props = { username: cleanUsername, data: resumeData, pData: portfolioData };
    
    switch (selectedTemplate) {
      case "formal":
        return <PortfolioThemeFormal {...props} />;
      case "cyberpunk":
        return <PortfolioThemeCyberpunk {...props} />;
      case "glass":
        return <PortfolioThemeGlass {...props} />;
      case "minimal_v2":
        return <PortfolioThemeMinimalV2 {...props} />;
      case "magazine":
        return <PortfolioThemeMagazine {...props} />;
      case "brutalist":
        return <PortfolioThemeBrutalist {...props} />;
      case "aura":
        return <PortfolioThemeAura {...props} />;
      case "nova":
        return <PortfolioThemeNova {...props} />;
      case "quantum":
        return <PortfolioThemeQuantum {...props} />;
      case "elysian":
        return <PortfolioThemeElysian {...props} />;
      case "titan":
        return <PortfolioThemeTitan {...props} />;
      case "modern_noir":
        return <PortfolioThemeModernNoir {...props} />;
      default:
        return <PortfolioThemeMinimalV2 {...props} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderTheme()}
    </div>
  );
}
