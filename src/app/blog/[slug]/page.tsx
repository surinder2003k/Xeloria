import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag, Terminal, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://xeloria.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blogs")
    .select("title, meta_description, featured_image, created_at, updated_at, category")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Post Not Found" };

  const postUrl = `${BASE_URL}/blog/${slug}`;
  const description = post.meta_description || "Expert career advice, portfolio tips, and professional development guides from Xeloria.";
  const image = post.featured_image || `${BASE_URL}/og-image.png`;

  return {
    title: post.title,
    description,
    keywords: [post.category, "career advice", "portfolio tips", "professional development", "Xeloria blog"].filter(Boolean),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description,
      siteName: "Xeloria",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: ["Xeloria Editorial Unit"],
      tags: [post.category].filter(Boolean),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
      site: "@xeloriaio",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) notFound();

  const postUrl = `${BASE_URL}/blog/${slug}`;

  // JSON-LD structured data for blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || "",
    image: post.featured_image || `${BASE_URL}/og-image.png`,
    url: postUrl,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Organization",
      name: "Xeloria Editorial Unit",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Xeloria",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.category || "",
    articleSection: post.category || "General",
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <article className="max-w-4xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <Link href="/blog">
          <Button variant="ghost" className="mb-16 gap-3 text-slate-500 hover:text-white pl-0 group font-black uppercase tracking-[0.2em] text-[10px]">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" /> Back to Intel Feed
          </Button>
        </Link>

        <header className="space-y-10 mb-20">
          <div className="flex items-center gap-6">
             <span className="px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
               {post.category || "SYSTEM_PROTOCOL"}
             </span>
             <div className="h-[1px] w-12 bg-white/10" />
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
               <Calendar className="h-4 w-4 text-indigo-500" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase italic">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-white/5 py-10">
             <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-indigo-600 border border-white/10 shadow-2xl flex items-center justify-center font-black text-white text-2xl italic">
                   X
                </div>
                <div>
                   <p className="text-[11px] font-black text-white uppercase tracking-widest">Xeloria Editorial Unit</p>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">STRATEGIC ASSET MANAGEMENT</p>
                </div>
             </div>
             <div className="flex gap-4">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all shadow-2xl">
                   <Share2 className="h-5 w-5" />
                </Button>
             </div>
          </div>
        </header>

        {post.featured_image && (
          <div className="aspect-[21/10] rounded-[3.5rem] overflow-hidden border border-white/10 mb-20 shadow-2xl bg-white/5">
             <img 
              src={post.featured_image} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-80"
              width={1200}
              height={571}
             />
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic prose-p:leading-relaxed prose-p:text-slate-400 prose-p:font-medium prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-white/[0.02] prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:text-white prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:uppercase prose-blockquote:tracking-wider prose-a:text-indigo-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">
           <span>XELORIA CORE // EST. 2024</span>
           <Link href="/blog" className="flex items-center gap-3 text-indigo-500 cursor-pointer hover:text-white transition-colors group">
              Next Protocol <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </article>

      <footer className="bg-white/[0.02] backdrop-blur-3xl py-32 border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
               <Sparkles className="h-3 w-3" /> Terminal Access
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase italic leading-none">Ready to <span className="text-indigo-500">synthesize?</span></h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">DEPLOY YOUR PROFESSIONAL NARRATIVE WITH OUR SUITE OF STRATEGIC TOOLS.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
               <Link href="/dashboard">
                 <Button className="h-16 px-12 bg-white text-black hover:bg-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-white/10 transition-all hover:scale-105">Launch Command Center</Button>
               </Link>
               <Link href="/templates">
                 <Button variant="outline" className="h-16 px-12 border-white/10 text-white hover:bg-white/5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl transition-all">Architect Themes</Button>
               </Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
