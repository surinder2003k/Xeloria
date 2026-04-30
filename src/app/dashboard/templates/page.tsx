"use client";

import { Button } from "@/components/ui/button";
import {
  Layout,
  Zap,
  ShieldCheck,
  ChevronRight,
  Star,
  Activity,
  ArrowLeft,
  Palette,
  Loader2,
  ArrowRight,
  Cpu,
  Layers,
  LayoutDashboard,
  FileText
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useState, Suspense, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const categories = [
  { id: "premium", name: "Premium Architectures", icon: Star, color: "text-amber-400" },
  { id: "modern", name: "Modern Synthesis", icon: Zap, color: "text-indigo-400" },
  { id: "legacy", name: "Stable Assets", icon: ShieldCheck, color: "text-slate-400" }
];

const portfolioThemes = [
  // PREMIUM
  { id: "quantum", category: "premium", name: "Quantum Node", description: "Advanced data-driven terminal with interactive grid patterns.", bgColor: "bg-[#020205]", textColor: "text-cyan-400", accentColor: "bg-cyan-500", isNew: true },
  { id: "elysian", category: "premium", name: "Elysian Studio", description: "Luxury serif aesthetic for elite professional distinction.", bgColor: "bg-[#fdfcfb]", textColor: "text-[#1a1a1a]", accentColor: "bg-[#8e7f74]", isNew: true },
  { id: "titan", category: "premium", name: "Titan Industrial", description: "Heavy-duty structural design for high-impact presence.", bgColor: "bg-[#111111]", textColor: "text-white", accentColor: "bg-[#ff5500]", isNew: true },
  { id: "modern_noir", category: "premium", name: "Modern Noir", description: "Ultra high-end minimalist dark theme with massive typography.", bgColor: "bg-[#080808]", textColor: "text-white", accentColor: "bg-white", isNew: true },
  { id: "nova", category: "premium", name: "Nova Genesis", description: "Futuristic glow-field with sophisticated typography.", bgColor: "bg-[#020205]", textColor: "text-cyan-400", accentColor: "bg-cyan-500" },
  
  // MODERN
  { id: "aura", category: "modern", name: "Aura Celestial", description: "Animated star-field design for a dreamlike presence.", bgColor: "bg-[#0a0a1a]", textColor: "text-white", accentColor: "bg-indigo-500" },
  { id: "glass", category: "modern", name: "Crystal Glass", description: "Modern glassmorphism with smooth translucency.", bgColor: "bg-indigo-50", textColor: "text-indigo-900", accentColor: "bg-indigo-500/20" },
  { id: "cyberpunk", category: "modern", name: "Neon Protocol", description: "High-tech terminal aesthetic for digital rebels.", bgColor: "bg-black", textColor: "text-[#00ff41]", accentColor: "bg-[#00ff41]" },
  
  // LEGACY
  { id: "formal", category: "legacy", name: "Formal Elite", description: "Sophisticated corporate layout for executive clarity.", bgColor: "bg-[#0f172a]", textColor: "text-[#c5a059]", accentColor: "bg-[#c5a059]" },
  { id: "magazine", category: "legacy", name: "Editorial Pro", description: "Bold magazine layout with high-end typography.", bgColor: "bg-[#fcfcfc]", textColor: "text-[#111]", accentColor: "bg-[#ff3b3b]" },
  { id: "brutalist", category: "legacy", name: "Raw Brutalist", description: "Un-apologetic design with bold borders and colors.", bgColor: "bg-[#ffdf1b]", textColor: "text-black", accentColor: "bg-black" },
];

function DashboardTemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("id");
  const { user } = useUser();
  const [isSelecting, setIsSelecting] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("premium");

  useEffect(() => {
    if (!portfolioId || portfolioId === "null") {
      const timer = setTimeout(() => {
        toast.error("Invalid configuration context.");
        router.push("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [portfolioId, router]);

  const filteredThemes = portfolioThemes.filter(t => t.category === activeCategory);

  const handleSelectPortfolio = async (themeId: string) => {
    if (!user) { toast.error("Please sign in first."); return; }
    setIsSelecting(themeId);
    
    try {
      if (portfolioId && portfolioId !== "null") {
        const { error } = await supabase
          .from('resumes')
          .update({ template_id: themeId })
          .eq('id', portfolioId)
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success(`Theme ${themeId} synchronized!`);
        router.push(`/dashboard/portfolio?id=${portfolioId}`);
      } else {
        toast.info("Initializing context...");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(`Selection failed: ${err.message}`);
    } finally {
      setIsSelecting(null);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Background Glows (Subtle for dashboard) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <header className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                  <Link href={portfolioId ? `/dashboard/portfolio-builder?id=${portfolioId}` : "/dashboard"} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2">
                      {portfolioId ? <FileText className="h-3 w-3" /> : <LayoutDashboard className="h-3 w-3" />} 
                      {portfolioId ? "Step 1: Back to Info" : "Back to Portal"}
                  </Link>
                  <div className="flex items-center gap-4">
                     <XeloriaLogo className="h-12 w-12 group-hover:scale-110 transition-all drop-shadow-2xl" />
                     <div>
                        <h1 className="text-4xl font-black tracking-tight uppercase">Pick <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Theme</span></h1>
                        <div className="flex items-center gap-2 mt-2">
                           <Palette className="h-3 w-3 text-slate-500" />
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Satellite Config // Aesthetic Selection Mode</p>
                        </div>
                     </div>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl p-2 sm:p-3 rounded-2xl border border-white/10 shadow-2xl w-full md:w-auto">
                  <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 border-r border-white/10">
                    <span className="flex items-center gap-1.5 opacity-40">
                      <span className="h-4 w-4 rounded-full bg-white/10 text-white flex items-center justify-center text-[8px]">1</span>
                      FILL INFO
                    </span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-indigo-400 flex items-center gap-1.5">
                      <span className="h-4 w-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[8px]">2</span>
                      THEME
                    </span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="flex items-center gap-1.5 opacity-40">
                      <span className="h-4 w-4 rounded-full bg-white/10 text-white flex items-center justify-center text-[8px]">3</span>
                      LIVE
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full sm:w-auto h-12 rounded-xl bg-white/5 border border-white/10 font-black gap-2 text-[10px] uppercase tracking-widest text-white hover:bg-white/10"
                  >
                    <Link href={`/dashboard/portfolio?id=${portfolioId}`}>
                      SKIP TO PORTAL
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
              </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((cat) => (
                  <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`h-12 md:h-14 px-4 md:px-8 rounded-xl flex items-center gap-3 md:gap-4 border transition-all font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] ${
                          activeCategory === cat.id 
                          ? "bg-white text-black border-white shadow-2xl shadow-white/10" 
                          : "bg-white/5 text-slate-500 border-white/5 hover:bg-white/10"
                      }`}
                  >
                      <cat.icon className={`h-3.5 w-3.5 md:h-4 w-4 ${activeCategory === cat.id ? "text-indigo-600" : cat.color}`} />
                      {cat.name}
                  </button>
              ))}
          </div>
      </header>

      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredThemes.map((theme, i) => (
            <motion.div
              key={theme.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: i * 0.05 
              }}
              className="group relative"
            >
              <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-indigo-500/50 transition-all flex flex-col h-full relative overflow-hidden shadow-2xl">
                  {theme.isNew && (
                      <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/50">
                          NEW
                      </div>
                  )}
                  
                  {/* Visual Mockup */}
                  <div className={`aspect-[4/3] rounded-[1.5rem] mb-8 overflow-hidden relative border border-white/5 shadow-inner p-6 flex flex-col gap-3 ${theme.bgColor} group-hover:scale-[1.02] transition-transform duration-500`}>
                      <div className="flex justify-between items-center">
                          <div className={`h-2.5 w-1/3 rounded-full ${theme.accentColor} opacity-20`} />
                          <div className="flex gap-1.5">
                              <div className={`h-1 w-5 rounded-full ${theme.textColor} opacity-20`} />
                              <div className={`h-1 w-5 rounded-full ${theme.textColor} opacity-20`} />
                          </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-center gap-3">
                          <div className={`h-5 w-3/4 rounded-sm ${theme.textColor} opacity-10`} />
                          <div className={`h-2.5 w-1/2 rounded-sm ${theme.textColor} opacity-5`} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                          <div className={`h-10 rounded-lg ${theme.accentColor} opacity-10`} />
                          <div className={`h-10 rounded-lg ${theme.textColor} opacity-5`} />
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md">
                          <Button 
                              onClick={() => handleSelectPortfolio(theme.id)}
                              className="h-16 w-16 rounded-full bg-white text-black p-0 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110"
                          >
                              <ChevronRight className="h-6 w-6" />
                          </Button>
                      </div>
                  </div>

                  <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-2.5">
                          <div className={`w-1 h-5 ${activeCategory === 'premium' ? 'bg-indigo-500' : 'bg-slate-500'}`} />
                          <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{theme.name}</h3>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                          {theme.description}
                      </p>
                  </div>

                  <Button
                      className={`w-full h-14 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] mt-8 transition-all ${
                          isSelecting === theme.id 
                          ? "bg-indigo-600 text-white" 
                          : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white hover:text-black hover:border-white shadow-xl hover:shadow-white/10"
                      }`}
                      onClick={() => handleSelectPortfolio(theme.id)}
                      disabled={isSelecting !== null}
                  >
                      {isSelecting === theme.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                          "DEPLOY_THEME"
                      )}
                  </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-12">
          <div className="space-y-4">
              <h4 className="text-lg font-black uppercase tracking-tight">System Intel</h4>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                  Switching themes will instantly re-synthesize your broadcast node. All data is preserved across architectures.
              </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-2">
                  <Cpu className="h-5 w-5 text-indigo-400" />
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Core Nodes</p>
                  <p className="text-xl font-black tracking-tight">12 ACTIVE</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-2">
                  <Layers className="h-5 w-5 text-purple-400" />
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Architectures</p>
                  <p className="text-xl font-black tracking-tight">3 CATEGORIES</p>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default function DashboardTemplatesPage() {
  return (
    <Suspense fallback={<div className="flex h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>}>
      <DashboardTemplatesContent />
    </Suspense>
  );
}
