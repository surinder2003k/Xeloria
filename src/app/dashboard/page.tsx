"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Globe, 
  BarChart3, 
  Plus, 
  ArrowRight, 
  Clock, 
  ExternalLink, 
  MoreVertical,
  BookOpen
} from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const { data: resumeData } = useResumeStore();
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  const [statsData, setStatsData] = useState({
    resumeCount: 0,
    portfolioViews: 0,
    blogCount: 0,
    searchImpressions: 0
  });
  const [recentResumes, setRecentResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchRealData() {
      try {
        // Portfolios view count
        const { data: pData } = await supabase
          .from('portfolios')
          .select('views')
          .eq('user_id', user!.id)
          .maybeSingle();

        // Blogs count (only fetch if Admin)
        let bgCount = 0;
        if (isAdmin) {
          const { count } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
          bgCount = count || 0;
        }

        setStatsData(prev => ({
          ...prev,
          portfolioViews: pData?.views || 0,
          blogCount: bgCount,
        }));
      } catch (e) {
         console.error("Supabase sync error:", e);
      } finally {
         setIsLoading(false);
      }
    }
    fetchRealData();
  }, [user, isAdmin]);

  const stats = [
    { label: "Site Views", value: isLoading ? "-" : statsData.portfolioViews, icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Profile Status", value: "Active", icon: Plus, color: "text-emerald-600", bg: "bg-emerald-50" },
    ...(isAdmin ? [{ label: "Draft Blogs", value: isLoading ? "-" : statsData.blogCount, icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" }] : []),
    { label: "SEO Impact", value: "High", icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {resumeData.personalInfo.fullName?.split(" ")[0] || "User"}!</h1>
            <p className="text-slate-500 font-medium mt-1">Here is what's happening with your professional brand today.</p>
          </div>
          <div className="flex gap-3">
              <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 px-8 py-6 h-auto font-bold group" asChild>
                <Link href="/dashboard/portfolio-builder">
                  <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" /> Create Portfolio
                </Link>
              </Button>
          </div>
        </header>

        {/* Quick Actions Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           <Link href="/dashboard/portfolio-builder" className="group">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all flex items-center gap-6 h-full">
                <div className="bg-indigo-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform">
                   <Globe className="h-8 w-8" />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Portfolio Builder</h2>
                   <p className="text-slate-500 text-sm font-medium">Build your professional presence.</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
             </div>
           </Link>
           <Link href="/templates" className="group">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/50 transition-all flex items-center gap-6 h-full">
                <div className="bg-emerald-600 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform">
                   <Plus className="h-8 w-8" />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Portfolio Themes</h2>
                   <p className="text-slate-500 text-sm font-medium">Choose your professional design.</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
             </div>
           </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Recent Creations */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Build Progress</h2>
              </div>
              
              <div className="space-y-6">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Filling out your professional information is the first step to going live. Once saved, your portfolio site will automatically update with your latest experience, education, and skills.
                  </p>
                  <Button className="rounded-2xl bg-indigo-600 h-14 px-8 font-bold text-lg" asChild>
                    <Link href="/dashboard/portfolio-builder">Enter Portfolio Info <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
              </div>
            </section>

            {isAdmin && (
              <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Blog Manager</h2>
                  <Button variant="ghost" className="text-indigo-600 font-bold group" asChild>
                     <Link href="/dashboard/blog/new">Write Post <Plus className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <div className="p-8 text-center bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200 text-slate-500 font-medium tracking-tight">
                    Go to the blog manager to create new posts. Only you can see this section.
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: Portfolio Card */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
                        <Globe className="h-6 w-6" />
                     </div>
                     <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-black border border-emerald-500/20">LIVE</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Your Portfolio</h2>
                    <p className="text-slate-400 mt-1 text-sm font-medium">summitcv.io/p/@{resumeData.personalInfo.fullName?.toLowerCase().replace(/\s+/g, "") || "username"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">{isLoading ? "-" : statsData.portfolioViews}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Views</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">0</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inquiries</p>
                     </div>
                  </div>
                  <Button className="w-full rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold h-12 shadow-xl group" asChild>
                     <Link href="/dashboard/portfolio">Edit Portfolio <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                  </Button>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-indigo-600/30 transition-colors" />
            </section>

            <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Quick Check</h3>
               <div className="space-y-4">
                  {[
                    { label: "Profile Completion", value: 85 },
                    { label: "SEO Score", value: 92 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                          <span>{item.label}</span>
                          <span className="text-indigo-600">{item.value}%</span>
                       </div>
                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            className="h-full bg-indigo-600 rounded-full"
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
