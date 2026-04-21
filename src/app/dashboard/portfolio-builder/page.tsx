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
  LayoutPanelLeft, Save, User, Briefcase, GraduationCap,
  Code, FolderGit2, Loader2, ArrowRight, CheckCircle2
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Link from "next/link";

const TABS = [
  { value: "personal",   label: "Profile",    icon: User },
  { value: "experience", label: "Experience", icon: Briefcase },
  { value: "education",  label: "Education",  icon: GraduationCap },
  { value: "skills",     label: "Skills",     icon: Code },
  { value: "projects",   label: "Projects",   icon: FolderGit2 },
];

export default function PortfolioBuilderPage() {
  const { templateId, data, userId: storeUserId, setUserId, reset } = useResumeStore();
  const { user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { setIsHydrating(false); return; }

    const syncStore = async () => {
      if (storeUserId !== user.id) {
        setIsHydrating(true);
        try {
          const { data: dbData } = await supabase
            .from('resumes')
            .select('resume_data, template_id')
            .eq('user_id', user.id)
            .maybeSingle();

          if (dbData?.resume_data) {
            useResumeStore.setState({
              data: dbData.resume_data,
              templateId: dbData.template_id || "formal",
              userId: user.id,
            });
          } else {
            reset();
            setUserId(user.id);
          }
        } catch (e) {
          console.error("Failed to sync store", e);
        } finally {
          setIsHydrating(false);
        }
      } else {
        setIsHydrating(false);
      }
    };
    syncStore();
  }, [user, isLoaded, storeUserId, reset, setUserId]);

  const handleSave = async () => {
    if (!user) { toast.error("Please sign in to save."); return; }
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const { data: existingRow, error: selectError } = await supabase
        .from('resumes').select('id').eq('user_id', user.id).maybeSingle();
      if (selectError) throw selectError;

      const payload = {
        resume_data: data,
        content: data,
        template_id: templateId,
        updated_at: new Date().toISOString(),
      };

      let saveError;
      if (existingRow) {
        const res = await supabase.from('resumes').update(payload).eq('user_id', user.id);
        saveError = res.error;
      } else {
        const res = await supabase.from('resumes').insert({
          user_id: user.id,
          name: data.personalInfo?.fullName || 'My Portfolio',
          ...payload,
        });
        saveError = res.error;
      }

      if (saveError) throw saveError;
      toast.success("Portfolio data saved!");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(`Save failed: ${err?.message || "Unknown error"}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isHydrating) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <p className="text-slate-500 font-medium text-sm">Loading your profile…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Progress Banner */}
      <div className="bg-white/60 backdrop-blur-xl border-b border-indigo-100/50 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-600">
              <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">1</span>
              Fill Info
            </span>
            <span className="h-px w-8 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-black">2</span>
              Pick Theme
            </span>
            <span className="h-px w-8 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-black">3</span>
              Share
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-slate-200 font-semibold gap-1.5 text-xs"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              ) : (
                <Save className="h-3 w-3" />
              )}
              {isSaving ? "Saving…" : saveSuccess ? "Saved!" : "Save"}
            </Button>
            <Link href="/templates">
              <Button
                size="sm"
                className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold gap-1.5 text-xs"
              >
                <LayoutPanelLeft className="h-3 w-3" /> Pick Theme
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent opacity-50 blur-3xl rounded-[3rem]"></div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 tracking-tight">Portfolio Builder</h1>
          <p className="text-slate-500 mt-3 font-medium text-lg">
            Architect your digital presence. This powers your professional site.
          </p>
        </div>

        {/* Tabs + Form */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <Tabs defaultValue="personal" className="w-full">
            <div className="border-b border-slate-100/50 px-8 pt-6 pb-2">
              <TabsList className="flex w-full bg-slate-100/50 p-1.5 gap-1 overflow-x-auto scrollbar-hide h-auto rounded-2xl border border-slate-200/50">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl text-slate-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all whitespace-nowrap border-0"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-8 lg:p-12">
              <TabsContent value="personal"   className="mt-0 focus-visible:outline-none"><PersonalInfoForm /></TabsContent>
              <TabsContent value="experience" className="mt-0 focus-visible:outline-none"><ExperienceForm /></TabsContent>
              <TabsContent value="education"  className="mt-0 focus-visible:outline-none"><EducationForm /></TabsContent>
              <TabsContent value="skills"     className="mt-0 focus-visible:outline-none"><SkillsForm /></TabsContent>
              <TabsContent value="projects"   className="mt-0 focus-visible:outline-none"><ProjectsForm /></TabsContent>
            </div>
          </Tabs>
        </div>


      </div>
    </div>
  );
}
