import { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
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
  searchParams: Promise<{ theme?: string; id?: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = "https://summitcv.io";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const cleanUsername = username.replace("@", "");

  // Fetch resume for rich metadata
  const { data: resumes } = await supabase
    .from("resumes")
    .select("content");

  const matchingResume = resumes?.find((r) => {
    const fullName = (r.content as any)?.personalInfo?.fullName || "";
    const slug = fullName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return slug === cleanUsername;
  });

  const personalInfo = (matchingResume?.content as any)?.personalInfo || {};
  const name = personalInfo.fullName || cleanUsername;
  const title = personalInfo.title || "Professional";
  const summary = personalInfo.summary || `Check out ${name}'s professional portfolio and career experience.`;
  const profileUrl = `${BASE_URL}/p/@${cleanUsername}`;
  const avatar = personalInfo.avatar || `${BASE_URL}/og-image.png`;

  return {
    title: `${name} — ${title}`,
    description: summary.substring(0, 160),
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      type: "profile",
      url: profileUrl,
      title: `${name} — ${title}`,
      description: summary.substring(0, 200),
      siteName: "Xeloria",
      images: [
        {
          url: avatar,
          width: 1200,
          height: 630,
          alt: `${name}'s professional portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — ${title}`,
      description: summary.substring(0, 200),
      images: [avatar],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const { username } = await params;
  const { theme: urlTheme } = await searchParams;

  // Normalize the incoming username (remove @ and handle encoded spaces)
  const cleanUsername = decodeURIComponent(username)
    .replace(/^@/, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const { data: resumes, error: resError } = await supabase
    .from("resumes")
    .select("user_id, resume_data, content, template_id, id");

  if (resError || !resumes) {
    console.error("Fetch resumes error:", resError);
    return notFound();
  }

  // Find by ID first (useful for previews) or by username normalization
  const sParams = await searchParams;
  const urlId = sParams.id && sParams.id !== "undefined" && sParams.id !== "null" ? sParams.id : null;
  
  const matchingResume = urlId 
    ? resumes.find(r => r.id === urlId)
    : resumes.find((r) => {
        const data = (r.resume_data || r.content) as any;
        const fullName = data?.personalInfo?.fullName || "";
        const normalizedName = fullName
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        return normalizedName === cleanUsername;
      });

  if (!matchingResume) {
    console.warn(`No matching resume found for cleanUsername: "${cleanUsername}" or ID: "${urlId}"`);
    return notFound();
  }

  const userId = matchingResume.user_id;
  const resumeData = (matchingResume.resume_data || matchingResume.content || {}) as unknown as ResumeData;
  const templateId = matchingResume.template_id;
  const personalInfo = (resumeData as any).personalInfo || {};

  // Extract portfolio settings from the consolidated resume_data
  const portfolioSettings = (resumeData as any)?.portfolioSettings || {};

  const portfolioData = {
    templateId: templateId || portfolioSettings.templateId || "formal",
    themeColor: portfolioSettings.themeColor || "#4f46e5",
    isPublic: portfolioSettings.isPublic ?? true,
    socialLinks: portfolioSettings.socialLinks || {},
    sectionsVisibility: portfolioSettings.sectionsVisibility || {
      hero: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      blog: true,
      contact: true,
    },
  };

  const selectedTemplate = urlTheme || portfolioData.templateId;

  // JSON-LD structured data for the person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: personalInfo.fullName || cleanUsername,
      jobTitle: personalInfo.title || "",
      description: personalInfo.summary || "",
      url: `${BASE_URL}/p/@${cleanUsername}`,
      email: personalInfo.email || "",
      telephone: personalInfo.phone || "",
      address: personalInfo.location
        ? {
            "@type": "PostalAddress",
            addressLocality: personalInfo.location,
          }
        : undefined,
      sameAs: [
        portfolioData.socialLinks?.linkedin,
        portfolioData.socialLinks?.github,
        portfolioData.socialLinks?.twitter,
      ].filter(Boolean),
    },
  };

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
      <script
        id="json-ld-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {renderTheme()}
      
      {/* Brand Attribution */}
      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none md:pointer-events-auto opacity-40 hover:opacity-100 transition-opacity">
         <a href="/" className="block">
             <XeloriaLogo className="h-5 w-5 grayscale hover:grayscale-0 transition-all" />
         </a>
      </div>
    </div>
  );
}
