"use client";

import { usePortfolioStore } from "@/lib/portfolio-store";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  ExternalLink, 
  Layout, 
  Save, 
  Loader2, 
  Monitor, 
  Eye, 
  Globe, 
  Share2, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Activity,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function PortfolioPortalContent() {
  const { data: pData, toggleSection, userId: storeUserId, setUserId, reset } = usePortfolioStore();
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioId = searchParams.get("id");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [fullName, setFullName] = useState("user");
  const [portfolioName, setPortfolioName] = useState("My Portfolio");

  const username = fullName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const publicPath = `/p/${username}`;
  
  useEffect(() => {
    if (!isLoaded || !user || !portfolioId) {
        if (isLoaded && !portfolioId) router.push("/dashboard");
        return;
    }

    const syncStore = async () => {
      setIsHydrating(true);
      try {
        const { data: dbData, error } = await supabase
          .from('resumes')
          .select('resume_data, template_id, name')
          .eq('id', portfolioId)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (dbData) {
          // Sync portfolio store with fetched data
          // Assuming portfolio settings are stored within resume_data or separate column
          // For now, let's assume we use the same content structure
          usePortfolioStore.setState({
            data: {
                ...(dbData.resume_data as any).portfolioSettings || {
                    templateId: dbData.template_id || "glass",
                    sections: { hero: true, experience: true, education: true, skills: true, projects: true }
                },
                templateId: dbData.template_id || "glass"
            },
            userId: user.id
          });
          setFullName((dbData.resume_data as any).personalInfo?.fullName || "user");
          setPortfolioName(dbData.name);
        }
      } catch (e) {
        console.error("Failed to sync portfolio", e);
        toast.error("Portfolio context missing");
        router.push("/dashboard");
      } finally {
        setIsHydrating(false);
      }
    };
    syncStore();
  }, [user, isLoaded, portfolioId, router]);

  const openPortfolio = () => {
    const fullUrl = `${window.location.origin}${publicPath}?theme=${pData.templateId}`;
    window.open(fullUrl, '_blank');
  };

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${publicPath}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName}'s Portfolio`,
          text: `Check out my digital portfolio built on SummitCV!`,
          url: fullUrl,
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(fullUrl);
          toast.success("Broadcast link copied to clipboard!");
        }
      }
    } else {
      navigator.clipboard.writeText(fullUrl);
      toast.success("Broadcast link copied to clipboard!");
    }
  };

  const handleSave = async () => {
    if (!user || !portfolioId) return;
    setIsSaving(true);
    try {
       // 1. Get current resume_data to preserve other fields (personalInfo, experience, etc.)
       const { data: current, error: fetchError } = await supabase
         .from('resumes')
         .select('resume_data')
         .eq('id', portfolioId)
         .single();

       if (fetchError) throw fetchError;

       // 2. Merge and update
       const updatedResumeData = {
          ...(current?.resume_data as any || {}),
          portfolioSettings: pData
       };

       const { error: updateError } = await supabase
         .from('resumes')
         .update({ 
            template_id: pData.templateId,
            resume_data: updatedResumeData,
            updated_at: new Date().toISOString() 
         })
         .eq('id', portfolioId)
         .eq('user_id', user.id);

       if (updateError) throw updateError;

       toast.success("Broadcast Node Synchronized!");
       
       // Refresh iframe preview
       const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
       if (iframe) {
          const currentSrc = new URL(iframe.src);
          currentSrc.searchParams.set('t', Date.now().toString()); // Cache bust
          iframe.src = currentSrc.toString();
       }
    } catch (err: any) {
       toast.error(`Sync failed: ${err?.message}`);
       console.error("Save error:", err);
    } finally {
       setIsSaving(false);
    }
  };

  if (isHydrating) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4">Pinging Satellite Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-[calc(100vh-12rem)] flex flex-col gap-6 md:gap-10 bg-[#050505] text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <div className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2">
               <LayoutDashboard className="h-3.5 w-3.5" /> Back to Portal
            </Link>
            <div className="flex items-center gap-4">
               <XeloriaLogo className="h-12 w-12 group-hover:scale-110 transition-all drop-shadow-2xl" />
               <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Settings</span></h1>
                  <div className="flex items-center gap-2 mt-2">
                     <Globe className="h-3 w-3 text-slate-500" />
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Satellite: {portfolioName} // Broadcast Mode: ACTIVE</p>
                  </div>
               </div>
            </div>
         </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto">
             <Button 
                variant="outline" 
                className="flex-1 md:flex-none h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-8 font-black text-[10px] uppercase tracking-widest border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
                onClick={handleShare}
             >
                <Share2 className="mr-2 h-4 w-4 text-indigo-400" /> <span className="hidden sm:inline">Share</span>
             </Button>
             
             <Button 
                className="flex-1 md:flex-none h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-10 bg-indigo-600 hover:bg-indigo-500 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 flex items-center gap-2"
                onClick={openPortfolio}
             >
                <ExternalLink className="h-4 w-4 text-white" />
                <span className="hidden sm:inline">VIEW LIVE</span>
                <span className="sm:hidden">LIVE</span>
             </Button>

             <Button 
                className="flex-1 md:flex-none h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-10 bg-white text-black hover:bg-slate-200 font-black text-[10px] uppercase tracking-widest shadow-xl"
                onClick={handleSave}
                disabled={isSaving}
             >
                {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="mr-2 h-4 w-4 fill-black" />}
                SAVE
             </Button>
          </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 overflow-hidden relative z-10">
         {/* Settings Side */}
         <div className="lg:col-span-4 space-y-8 overflow-y-auto pr-4 scrollbar-hide">
            {/* Live Link Card */}

            {/* Theme Config */}
            <section className="bg-white/5 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl p-6 md:p-10 space-y-8">
               <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <Layout className="h-6 w-6 text-indigo-400" /> Design Architecture
               </h3>
               
               <div className="space-y-4">
                  <div className="p-6 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Engine</p>
                     <p className="text-2xl font-black text-white uppercase tracking-tight">{pData.templateId.replace('_', ' ')}</p>
                     <Button variant="link" className="p-0 text-indigo-400 font-bold h-auto hover:text-indigo-300" asChild>
                        <Link href={portfolioId && portfolioId !== "null" ? `/dashboard/templates?id=${portfolioId}` : "/dashboard"} className="flex items-center gap-2">Reconfigure Engine <ArrowRight className="h-3 w-3" /></Link>
                     </Button>
                  </div>

                  <div className="space-y-6 pt-4">
                     {Object.entries(pData.sectionsVisibility || {}).map(([key, val]: any) => (
                        <div key={key} className="flex items-center justify-between">
                           <Label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] capitalize">{key}</Label>
                           <Switch 
                              checked={val} 
                              onCheckedChange={() => toggleSection(key)}
                              className="data-[state=checked]:bg-indigo-500"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Additional Info can go here */}
         </div>

         {/* Preview Side */}
         <div className="lg:col-span-8 bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/10 overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 flex flex-col p-8">
               <div className="bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl flex-1 flex flex-col overflow-hidden border border-white/5">
                  {/* Browser Mockup Header */}
                  <div className="h-14 bg-white/[0.02] border-b border-white/5 flex items-center px-8 gap-6">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                     </div>
                     <div className="flex-1 bg-white/5 border border-white/5 rounded-xl h-8 flex items-center px-4 text-[10px] text-slate-500 font-mono truncate tracking-tight">
                        https://xeloria.site{publicPath}
                     </div>
                     <div className="flex gap-4 items-center">
                        <Monitor className="h-4 w-4 text-slate-600" />
                        <Eye className="h-4 w-4 text-indigo-400" />
                     </div>
                  </div>
                  
                  <div className="flex-1 relative bg-white">
                     <iframe 
                        id="preview-iframe"
                        src={`${publicPath}?theme=${pData.templateId}&id=${portfolioId}`} 
                        className="w-full h-full border-none"
                     />
                     
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center backdrop-blur-[2px]">
                        <div className="px-8 py-4 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
                              <Activity className="h-4 w-4 text-indigo-400 animate-pulse" /> LIVE STREAM RENDERING
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default function PortfolioPortal() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /></div>}>
      <PortfolioPortalContent />
    </Suspense>
  );
}
