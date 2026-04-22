"use client";

import { useResumeStore } from "@/lib/store";
import { PersonalInfoForm } from "@/components/resume/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/resume/forms/ExperienceForm";
import { EducationForm } from "@/components/resume/forms/EducationForm";
import { SkillsForm } from "@/components/resume/forms/SkillsForm";
import { ProjectsForm } from "@/components/resume/forms/ProjectsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  User, Briefcase, GraduationCap,
  Code, FolderGit2, Loader2, ArrowRight, CheckCircle2,
  ChevronRight, Save, Layout, ArrowLeft
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { AIAssistant } from "@/components/ai/AIAssistant";

const TABS = [
  { value: "personal",   label: "Profile",    icon: User },
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "education",  label: "Education",  icon: GraduationCap },
  { value: "skills",     label: "Skills",     icon: Code },
  { value: "projects",   label: "Projects",   icon: FolderGit2 },
];

function BuilderContent() {
  const { templateId, data, userId: storeUserId, setUserId, reset } = useResumeStore();
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioId = searchParams.get("id");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [portfolioName, setPortfolioName] = useState("Untitled Portfolio");

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchPortfolio = async () => {
      setIsHydrating(true);
      try {
        if (portfolioId) {
          const { data: dbData, error } = await supabase
            .from('resumes')
            .select('resume_data, template_id, name')
            .eq('id', portfolioId)
            .eq('user_id', user.id)
            .single();

          if (error) throw error;

          if (dbData) {
            useResumeStore.setState({
              data: dbData.resume_data as any,
              templateId: dbData.template_id || "glass",
              userId: user.id,
            });
            setPortfolioName(dbData.name);
          }
        } else {
          // If no ID, either reset or stay as is (handled by store)
          reset();
          setUserId(user.id);
        }
      } catch (e) {
        console.error("Failed to fetch portfolio", e);
        toast.error("Portfolio not found");
        router.push("/dashboard");
      } finally {
        setIsHydrating(false);
      }
    };

    fetchPortfolio();
  }, [user, isLoaded, portfolioId, router]);

  const handleSave = async () => {
    if (!user || !portfolioId) { 
      toast.error("Save context missing."); 
      return; 
    }
    
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const payload = {
        resume_data: data,
        content: data, // Sync both for compatibility
        name: portfolioName,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('resumes')
        .update(payload)
        .eq('id', portfolioId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success("Synthesis saved successfully!");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      toast.error(`Save failed: ${err?.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isHydrating) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4">Calibrating Editor Flow...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white space-y-12">
       {/* Background Glows */}
       <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <div className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2">
               <ArrowLeft className="h-3 w-3" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Layout className="h-6 w-6 text-indigo-400" />
               </div>
               <div>
                  <h1 className="text-4xl font-black tracking-tight uppercase">Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Builder</span></h1>
                  <input 
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                    className="bg-transparent border-none text-[10px] font-bold text-slate-500 uppercase tracking-widest focus:outline-none p-0 w-full"
                  />
               </div>
            </div>
         </div>
         
         <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl p-2 sm:p-3 rounded-2xl border border-white/10 shadow-2xl w-full md:w-auto">
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 border-r border-white/10">
              <span className="text-indigo-400 flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[8px]">1</span>
                FILL INFO
              </span>
              <ChevronRight className="h-3 w-3" />
              <span className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[8px]">2</span>
                THEME
              </span>
              <ChevronRight className="h-3 w-3" />
              <span className="flex items-center gap-1.5 opacity-40">
                <span className="h-4 w-4 rounded-full bg-white/10 text-white flex items-center justify-center text-[8px]">3</span>
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-12 rounded-xl bg-white/5 border border-white/10 font-black gap-2 text-[10px] uppercase tracking-widest text-white hover:bg-white/10"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : saveSuccess ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Save className="h-3 w-3 text-indigo-400" />
                )}
                SAVE
              </Button>
              <Button
                asChild
                className="flex-1 sm:flex-none h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-black gap-2 text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20"
              >
                <Link href={`/dashboard/templates?id=${portfolioId}`}>
                  PICK THEME
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
         </div>
      </div>

      {/* Tabs + Form */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
        <Tabs defaultValue="personal" className="w-full">
          <div className="border-b border-white/10 px-4 md:px-10 pt-6 md:pt-8 pb-4">
            <TabsList className="flex w-full bg-white/5 p-1 gap-1 overflow-x-auto scrollbar-hide h-auto rounded-xl md:rounded-2xl border border-white/10">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-slate-500 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all whitespace-nowrap border-0"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-6 md:p-14 bg-gradient-to-b from-transparent to-white/[0.02]">
            <div className="max-w-4xl mx-auto">
               <TabsContent value="personal"   className="mt-0 focus-visible:outline-none"><PersonalInfoForm /></TabsContent>
               <TabsContent value="experience" className="mt-0 focus-visible:outline-none"><ExperienceForm /></TabsContent>
               <TabsContent value="education"  className="mt-0 focus-visible:outline-none"><EducationForm /></TabsContent>
               <TabsContent value="skills"     className="mt-0 focus-visible:outline-none"><SkillsForm /></TabsContent>
               <TabsContent value="projects"   className="mt-0 focus-visible:outline-none"><ProjectsForm /></TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      <AIAssistant />

      <style jsx global>{`
        input, textarea, select {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 1rem !important;
          padding: 1rem !important;
        }
        input:focus, textarea:focus {
          border-color: #6366f1 !important;
          outline: none !important;
        }
        label {
          color: #94a3b8 !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 0.7rem !important;
          margin-bottom: 0.5rem !important;
        }
      `}</style>
    </div>
  );
}

export default function PortfolioBuilderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
