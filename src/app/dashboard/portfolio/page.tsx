"use client";

import { usePortfolioStore } from "@/lib/portfolio-store";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Layout, Copy, Save, Loader2, Monitor, Eye } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function PortfolioEditorPage() {
  const { data: pData, toggleSection, userId: storeUserId, setUserId, reset } = usePortfolioStore();
  const { data: rData } = useResumeStore();
  const { user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  // Derived URL logic for preview - must match src/app/p/[username]/page.tsx
  const username = (rData.personalInfo.fullName || "user")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, ""); // Remove any special characters to match public page
  const publicPath = `/p/${username}`;
  
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setIsHydrating(false);
      return;
    }

    const syncStore = async () => {
      if (storeUserId !== user.id) {
        setIsHydrating(true);
        try {
          const { data: dbData } = await supabase
            .from('portfolios')
            .select('content')
            .eq('user_id', user.id)
            .maybeSingle();

          if (dbData && dbData.content) {
            usePortfolioStore.setState({
              data: dbData.content as any,
              userId: user.id
            });
          } else {
            reset();
            setUserId(user.id);
          }
        } catch (e) {
          console.error("Failed to sync portfolio store", e);
        } finally {
          setIsHydrating(false);
        }
      } else {
        setIsHydrating(false);
      }
    };
    syncStore();
  }, [user, isLoaded, storeUserId, reset, setUserId]);

  if (isHydrating) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  const openPortfolio = () => {
    const fullUrl = `${window.location.origin}${publicPath}?theme=${pData.templateId}`;
    window.open(fullUrl, '_blank');
  };

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${publicPath}`;
    const shareData = {
      title: `${rData.personalInfo.fullName}'s Portfolio`,
      text: `Check out my professional portfolio on Xeloria!`,
      url: fullUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      // Fallback: Copy to clipboard and offer WhatsApp
      navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied! You can now paste it anywhere.");
      window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + " " + fullUrl)}`, '_blank');
    }
  };

  const handleSave = async () => {
    if (!user) {
       toast.error("You must be logged in to save.");
       return;
    }
    setIsSaving(true);
    try {
       const { data: existingRow, error: selectError } = await supabase
         .from('portfolios')
         .select('id')
         .eq('user_id', user.id)
         .maybeSingle();

       if (selectError) throw selectError;

       let saveError;
        if (existingRow) {
          const res = await supabase
            .from('portfolios')
            .update({
              content: pData,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id);
          saveError = res.error;
        } else {
          const res = await supabase
            .from('portfolios')
            .insert({
              user_id: user.id,
              content: pData,
            });
          saveError = res.error;
        }

       if (saveError) throw saveError;
       toast.success("Portfolio saved successfully!");
       
       // Force iframe refresh by pinging it or waiting
       const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
       if (iframe) iframe.src = iframe.src;
       
    } catch (err: any) {
       console.error("Supabase save error:", err);
       toast.error(`Save failed: ${err?.message || "Unknown error"}`);
    } finally {
       setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Side */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col h-full border-r border-slate-200 bg-white shadow-xl z-10">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <header className="mb-8 flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portfolio Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure your public site structure.</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl gap-3 flex-1 shadow-xl shadow-indigo-100 text-lg font-black group transition-all hover:scale-[1.02]" onClick={openPortfolio}>
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  View Live Site
                </Button>
                <Button variant="outline" size="lg" className="h-14 rounded-2xl gap-3 flex-1 border-slate-200 text-lg font-black hover:bg-slate-50 transition-all" onClick={handleShare}>
                  <Save className="h-5 w-5 text-indigo-600" /> Share Your Portfolio
                </Button>
              </div>
            </header>

            <div className="space-y-6">
              {/* Section Toggles */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Layout className="h-4 w-4 text-indigo-600" />
                    Portfolio Theme
                  </h3>
                  <Button variant="link" size="sm" className="text-indigo-600 h-auto p-0 font-bold text-xs" asChild>
                    <a href="/templates">Change Theme</a>
                  </Button>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Monitor className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Active Template</p>
                        <p className="text-sm font-bold text-slate-700 capitalize">{pData.templateId.replace('_', ' ')}</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-50" onClick={handleSave} disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-slate-400" />}
                   </Button>
                </div>
              </div>



              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                <p className="text-[11px] text-indigo-700 font-medium leading-relaxed">
                  <strong>Pro Tip:</strong> Your portfolio uses your latest professional data. Update your info in the Portfolio Builder to see it reflected here instantly.
                </p>
              </div>


            </div>
          </div>
        </div>
        
        {/* Right Side: LIVE PREVIEW IFRAME */}
        <div className="hidden lg:flex flex-1 bg-slate-100 relative group overflow-hidden">
           <div className="absolute inset-0 flex flex-col p-8">
              <div className="bg-white rounded-2xl shadow-2xl flex-1 flex flex-col overflow-hidden border border-slate-200">
                {/* Browser Header UI */}
                <div className="h-10 bg-slate-50 border-bottom border-slate-200 flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                   </div>
                   <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md h-6 flex items-center px-3 text-[10px] text-slate-400 font-mono truncate">
                      {window.location.origin}{publicPath}
                   </div>
                   <div className="flex gap-4 items-center text-slate-400">
                      <Monitor className="h-3 w-3" />
                      <Eye className="h-3 w-3" />
                   </div>
                </div>
                
                {/* The Iframe */}
                <div className="flex-1 bg-white relative">
                   <iframe 
                      id="preview-iframe"
                      src={`${publicPath}?t=${Date.now()}&theme=${pData.templateId}`} 
                      className="w-full h-full border-none"
                      title="Portfolio Preview"
                   />
                </div>
              </div>
           </div>
           
           {/* Floating Badge */}
           <div className="absolute top-12 right-12 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Live Preview
           </div>
        </div>
      </div>
    </div>
  );
}
