"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Layout,
  Sparkles,
  ArrowRight,
  Monitor,
  Zap,
  ShieldCheck,
  Shapes
} from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// ─── Template data with preview components ────────────────────────────────────

// Note: Resume templates have been removed to focus on Digital Portfolios.



const portfolioThemes = [
  { 
    id: "formal", 
    name: "Formal Elegance", 
    description: "Sophisticated navy and gold design for corporate excellence.", 
    bgColor: "bg-[#0f172a]", 
    textColor: "text-[#c5a059]",
    accentColor: "bg-[#c5a059]"
  },
  { 
    id: "cyberpunk", 
    name: "Cyberpunk 2077", 
    description: "High-tech, neon-infused terminal aesthetic for digital rebels.", 
    bgColor: "bg-black", 
    textColor: "text-[#00ff41]",
    accentColor: "bg-[#00ff41]"
  },
  { 
    id: "magazine", 
    name: "Magazine Editor", 
    description: "Bold editorial layout with high-end typography and red accents.", 
    bgColor: "bg-[#fcfcfc]", 
    textColor: "text-[#111]",
    accentColor: "bg-[#ff3b3b]"
  },
  { 
    id: "glass", 
    name: "Crystal Glass", 
    description: "Modern glassmorphism with smooth translucency and soft glows.", 
    bgColor: "bg-indigo-50", 
    textColor: "text-indigo-900",
    accentColor: "bg-indigo-500/20"
  },
  { 
    id: "brutalist", 
    name: "Neo-Brutalist", 
    description: "Raw, un-apologetic design with bold borders and vibrant colors.", 
    bgColor: "bg-[#ffdf1b]", 
    textColor: "text-black",
    accentColor: "bg-black"
  },
  { 
    id: "minimal_v2", 
    name: "Pure Minimal", 
    description: "The ultimate focus on content with zero distractions.", 
    bgColor: "bg-white", 
    textColor: "text-slate-900",
    accentColor: "bg-slate-100"
  },
  { 
    id: "aura", 
    name: "Aura Celestial", 
    description: "An ethereal, animated star-field design for a dreamlike presence.", 
    bgColor: "bg-[#0a0a1a]", 
    textColor: "text-white",
    accentColor: "bg-indigo-500"
  },
  { 
    id: "nova", 
    name: "Nova Quantum", 
    description: "A high-tech, futuristic layout with glowing nodes and grid patterns.", 
    bgColor: "bg-[#020205]", 
    textColor: "text-cyan-400",
    accentColor: "bg-cyan-500"
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const { setTemplateId } = useResumeStore();
  const { updateData, setUserId, data: storedData } = usePortfolioStore();
  const router = useRouter();
  const { user } = useUser();
  const [isSelecting, setIsSelecting] = useState<string | null>(null);

  // Removed handleSelectResume

  const handleSelectPortfolio = async (id: string) => {
    setIsSelecting(id);
    
    // 1. Update local store
    updateData({ templateId: id });
    
    // 2. If logged in, sync to database immediately
    if (user) {
      try {
        const { data: currentStore } = usePortfolioStore.getState();
        const updatedContent = { ...currentStore, templateId: id };
        
        const { error } = await supabase
          .from('portfolios')
          .upsert({
            user_id: user.id,
            content: updatedContent,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) throw error;
        
        // Update store's userId to prevent dashboard sync from over-writing
        setUserId(user.id);
        toast.success("Portfolio theme updated!");
      } catch (err: any) {
        console.error("Failed to save theme selection:", err);
        toast.error("Saved locally, but failed to sync to cloud.");
      }
    } else {
      toast.info("Theme selected! Sign in to save it forever.");
    }

    setIsSelecting(null);
    router.push("/dashboard/portfolio");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>Discover Our Designs</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Professional templates for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              every career path.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium leading-relaxed"
          >
            Choose from our curated collection of professional portfolio
            themes, designed to launch your professional career online.
          </motion.p>
        </div>

        {/* Removed Resume Templates Section */}

        {/* Portfolio Themes */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-100">
              <Layout className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio Themes</h2>
              <p className="text-slate-500 font-bold">Showcase your work</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioThemes.map((theme, i) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900 rounded-[2.5rem] p-6 text-white hover:shadow-2xl hover:shadow-indigo-900/40 transition-all flex flex-col"
              >
                <div className={`aspect-video rounded-2xl mb-6 overflow-hidden relative border border-white/10 shadow-inner p-4 flex flex-col gap-3 ${theme.bgColor} group-hover:scale-[1.02] transition-transform duration-500`}>
                   {/* Navbar */}
                   <div className="flex justify-between items-center w-full">
                       <div className={`h-2 w-1/4 rounded-full ${theme.accentColor} opacity-90`} />
                       <div className="flex gap-1.5">
                           <div className={`h-1 w-6 rounded-full ${theme.textColor} opacity-50`} />
                           <div className={`h-1 w-6 rounded-full ${theme.textColor} opacity-50`} />
                           <div className={`h-1 w-6 rounded-full ${theme.textColor} opacity-50`} />
                       </div>
                   </div>
                   
                   {/* Hero */}
                   <div className="flex-1 flex flex-col justify-center items-center gap-2 mt-1">
                       <div className={`h-3 w-3/4 rounded-full ${theme.textColor} opacity-90`} />
                       <div className={`h-1.5 w-1/2 rounded-full ${theme.textColor} opacity-40`} />
                       <div className={`h-3 w-16 mt-1 rounded-full ${theme.accentColor} opacity-80`} />
                   </div>
                   
                   {/* Grid (Projects) */}
                   <div className="flex gap-2 mt-auto">
                       <div className={`h-8 w-1/3 rounded-md ${theme.textColor} opacity-10`} />
                       <div className={`h-8 w-1/3 rounded-md ${theme.textColor} opacity-20`} />
                       <div className={`h-8 w-1/3 rounded-md ${theme.textColor} opacity-10`} />
                   </div>

                   {/* Dark overlay container for full hover effect / Name */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                       <h4 className="text-white font-black uppercase tracking-widest text-sm text-center px-4 leading-tight">
                         {theme.name}
                       </h4>
                   </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-black mb-2">{theme.name}</h3>
                  <p className="text-sm text-slate-400 font-medium mb-6">{theme.description}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-bold h-12 transition-all mt-auto"
                  onClick={() => handleSelectPortfolio(theme.id)}
                  disabled={isSelecting !== null}
                >
                  {isSelecting === theme.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Select Theme"
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border border-slate-100 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-8">
                Why use Xeloria designs?
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Blazing Fast", desc: "Built with Next.js for instant loading." },
                  { icon: ShieldCheck, title: "ATS Optimized", desc: "Pass recruiter filters with ease." },
                  { icon: Shapes, title: "Customizable", desc: "Every template is fully under your control." },
                  { icon: Monitor, title: "Responsive", desc: "Looks great on mobile, tablet, and desktop." },
                ].map((feat) => (
                  <div key={feat.title} className="flex gap-4">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                      <feat.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{feat.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="absolute top-12 left-12 right-12 bottom-0 bg-white rounded-t-3xl border-x border-t border-indigo-100 shadow-2xl overflow-hidden">
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6">
                      <div className="h-full w-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl flex items-center justify-center translate-x-1/2 -translate-y-1/2" />
                        <div className="h-4 w-32 bg-white/20 rounded-full mb-6" />
                        <div className="flex gap-4 mb-8">
                          <div className="h-16 w-16 bg-white/10 rounded-full border border-white/20 shadow-inner" />
                          <div className="space-y-3 flex-1 pt-2">
                            <div className="h-3 w-48 bg-white/40 rounded-full" />
                            <div className="h-2 w-32 bg-indigo-400/60 rounded-full" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-white/10 rounded-full" />
                          <div className="h-2 w-[90%] bg-white/10 rounded-full" />
                          <div className="h-2 w-[80%] bg-white/10 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        </section>
      </main>
    </div>
  );
}
