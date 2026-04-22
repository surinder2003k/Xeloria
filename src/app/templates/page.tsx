"use client";

import { Button } from "@/components/ui/button";
import {
  Layout,
  Sparkles,
  ArrowRight,
  Monitor,
  Zap,
  ShieldCheck,
  Shapes,
  Loader2,
  ArrowLeft,
  ChevronRight,
  Star,
  Activity,
  Cpu,
  Layers
} from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio-store";
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

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("id");
  const { user } = useUser();
  const [isSelecting, setIsSelecting] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("premium");

  useEffect(() => {
    if (portfolioId && portfolioId !== "null") {
      const timer = setTimeout(() => {
        router.push(`/dashboard/templates?id=${portfolioId}`);
      }, 500);
      return () => clearTimeout(timer);
    } else {
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
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <header className="mb-20 space-y-8">
            <div className="flex justify-between items-center">
                <Link href={portfolioId ? `/dashboard/portfolio?id=${portfolioId}` : "/dashboard"} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                    <ArrowLeft className="h-3 w-3" /> System Backlink
                </Link>
                <div className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-3">
                    <Activity className="h-3 w-3 text-indigo-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">DESIGN_ENGINE_V3.0 // ACTIVE</span>
                </div>
            </div>
            
            <div className="max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
                    Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Aesthetic DNA</span>
                </h1>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.3em] mt-8 leading-relaxed max-w-2xl border-l-2 border-indigo-500/30 pl-8">
                    Choose from our high-performance design architectures. Each node is optimized for peak professional broadcast.
                </p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap gap-4 pt-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`h-16 px-10 rounded-2xl flex items-center gap-4 border transition-all font-black text-[10px] uppercase tracking-[0.2em] ${
                            activeCategory === cat.id 
                            ? "bg-white text-black border-white shadow-2xl shadow-white/10" 
                            : "bg-white/5 text-slate-500 border-white/5 hover:bg-white/10"
                        }`}
                    >
                        <cat.icon className={`h-4 w-4 ${activeCategory === cat.id ? "text-indigo-600" : cat.color}`} />
                        {cat.name}
                    </button>
                ))}
            </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 hover:border-indigo-500/50 transition-all flex flex-col h-full relative overflow-hidden shadow-2xl">
                    {theme.isNew && (
                        <div className="absolute top-8 right-8 z-20 px-4 py-1 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/50">
                            NEW_RELEASE
                        </div>
                    )}
                    
                    {/* Visual Mockup */}
                    <div className={`aspect-[4/3] rounded-[2rem] mb-10 overflow-hidden relative border border-white/5 shadow-inner p-8 flex flex-col gap-4 ${theme.bgColor} group-hover:scale-[1.02] transition-transform duration-500`}>
                        <div className="flex justify-between items-center">
                            <div className={`h-3 w-1/3 rounded-full ${theme.accentColor} opacity-20`} />
                            <div className="flex gap-2">
                                <div className={`h-1.5 w-6 rounded-full ${theme.textColor} opacity-20`} />
                                <div className={`h-1.5 w-6 rounded-full ${theme.textColor} opacity-20`} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-center gap-4">
                            <div className={`h-6 w-3/4 rounded-sm ${theme.textColor} opacity-10`} />
                            <div className={`h-3 w-1/2 rounded-sm ${theme.textColor} opacity-5`} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            <div className={`h-12 rounded-xl ${theme.accentColor} opacity-10`} />
                            <div className={`h-12 rounded-xl ${theme.textColor} opacity-5`} />
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md">
                            <Button 
                                onClick={() => handleSelectPortfolio(theme.id)}
                                className="h-20 w-20 rounded-full bg-white text-black p-0 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-grow space-y-6">
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-6 ${activeCategory === 'premium' ? 'bg-indigo-500' : 'bg-slate-500'}`} />
                            <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{theme.name}</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                            {theme.description}
                        </p>
                    </div>

                    <Button
                        className={`w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] mt-12 transition-all ${
                            isSelecting === theme.id 
                            ? "bg-indigo-600 text-white" 
                            : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white hover:text-black hover:border-white shadow-xl hover:shadow-white/10"
                        }`}
                        onClick={() => handleSelectPortfolio(theme.id)}
                        disabled={isSelecting !== null}
                    >
                        {isSelecting === theme.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "SYNCHRONIZE_ENGINE"
                        )}
                    </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        <section className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-white/5 pt-20">
            <div className="space-y-6">
                <h4 className="text-2xl font-black uppercase tracking-tight">Need a custom node?</h4>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                    Our architects can build specialized environments for high-stakes professional narratives. Establish a secure link to discuss custom deployments.
                </p>
                <Button variant="link" className="p-0 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-300">
                    CONTACT_ARCHITECTS <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] space-y-3">
                    <Cpu className="h-6 w-6 text-indigo-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Active Engines</p>
                    <p className="text-3xl font-black">10+</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] space-y-3">
                    <Layers className="h-6 w-6 text-purple-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Deployments</p>
                    <p className="text-3xl font-black">2.4K</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /></div>}>
      <TemplatesContent />
    </Suspense>
  );
}
